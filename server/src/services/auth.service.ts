import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/AppError.js';
import {
  generateSessionToken,
  hashSessionToken,
  SESSION_DURATION_MS,
} from '../utils/session.js';

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

function getPublicUser(user: {
  id: string;
  fullName: string;
  email: string;
  role: string;
}) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
}

export async function registerUser(data: RegisterInput) {
  const email = data.email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email,
      passwordHash,
    },
  });

  return getPublicUser(user);
}

export async function loginUser(data: LoginInput) {
  const email = data.email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError('Invalid email or password.', 401);
  }

  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  return {
    user: getPublicUser(user),
    token,
  };
}

export async function getUserFromSession(token: string) {
  const tokenHash = hashSessionToken(token);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt <= new Date()) {
    if (session) {
      await prisma.session.delete({
        where: { id: session.id },
      });
    }

    return null;
  }

  return getPublicUser(session.user);
}

export async function deleteSession(token: string) {
  const tokenHash = hashSessionToken(token);

  await prisma.session.deleteMany({
    where: { tokenHash },
  });
}
