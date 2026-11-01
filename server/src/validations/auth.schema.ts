import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, 'Password must contain an uppercase letter.')
    .regex(/[a-z]/, 'Password must contain a lowercase letter.')
    .regex(/[0-9]/, 'Password must contain a number.'),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(128),
});
