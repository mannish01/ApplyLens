import type { Request, Response, NextFunction } from 'express';

import type { UserRole } from '../generated/prisma/client.js';

export function requireRole(...allowedRoles: UserRole[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
      return;
    }

    next();
  };
}
