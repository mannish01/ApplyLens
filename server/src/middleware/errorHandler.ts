
import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import { AppError } from '../utils/AppError.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Handle Multer upload errors
  if (error instanceof multer.MulterError) {
    const statusCode =
      error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;

    res.status(statusCode).json({
      success: false,
      message:
        error.code === 'LIMIT_FILE_SIZE'
          ? 'File size exceeds the 10 MB limit.'
          : 'Invalid file upload.',
    });

    return;
  }

  // Handle application errors
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  // Handle unexpected errors
  console.error(error);

  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
}
