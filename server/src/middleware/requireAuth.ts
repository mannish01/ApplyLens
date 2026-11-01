import type { Request, Response, NextFunction } from 'express';

import { getUserFromSession } from '../services/auth.service.js';
import { SESSION_COOKIE_NAME } from '../utils/session.js';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.[SESSION_COOKIE_NAME];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
      return;
    }

    const user = await getUserFromSession(token);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Session expired or invalid.',
      });
      return;
    }

    res.locals.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
