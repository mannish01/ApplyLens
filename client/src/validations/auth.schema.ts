import { z } from 'zod';

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Name must contain at least 2 characters.')
      .max(80, 'Name cannot exceed 80 characters.'),

    email: z.string().trim().email('Enter a valid email address.'),

    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.')
      .max(128, 'Password cannot exceed 128 characters.')
      .regex(/[A-Z]/, 'Include at least one uppercase letter.')
      .regex(/[a-z]/, 'Include at least one lowercase letter.')
      .regex(/[0-9]/, 'Include at least one number.'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
