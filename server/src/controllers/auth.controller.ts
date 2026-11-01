import type { Request, Response } from 'express';

import {
  registerUser,
  loginUser,
  getUserFromSession,
  deleteSession,
} from '../services/auth.service.js';

import { registerSchema, loginSchema } from '../validations/auth.schema.js';

import {
  SESSION_COOKIE_NAME,
} from '../utils/session.js';

import { authCookieOptions } from '../utils/authCookie.js';

import { AppError } from '../utils/AppError.js';

export async function register(req: Request, res: Response) {
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    throw new AppError('Invalid registration details.', 400);
  }

  const user = await registerUser(validation.data);

  res.status(201).json({
    success: true,
    user,
  });
}

export async function login(req: Request, res: Response) {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    throw new AppError('Invalid email or password.', 400);
  }

  const result = await loginUser(validation.data);

  res.cookie(
    SESSION_COOKIE_NAME,
    result.token,
    authCookieOptions,
  );

  res.status(200).json({
    success: true,
    user: result.user,
  });
}

export async function getMe(req: Request, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];

  if (!token) {
    throw new AppError('Authentication required.', 401);
  }

  const user = await getUserFromSession(token);

  if (!user) {
    res.clearCookie(SESSION_COOKIE_NAME, {
      ...authCookieOptions,
      maxAge: undefined,
    });

    throw new AppError('Session expired or invalid.', 401);
  }

  res.status(200).json({
    success: true,
    user,
  });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];

  if (token) {
    await deleteSession(token);
  }

  res.clearCookie(SESSION_COOKIE_NAME, {
    ...authCookieOptions,
    maxAge: undefined,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
}
