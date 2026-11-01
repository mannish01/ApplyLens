import type { Request, Response } from 'express';

import { saveDocument } from '../services/document.service.js';
import { validatePdf } from '../utils/validatePdf.js';
import { AppError } from '../utils/AppError.js';

export async function uploadDocument(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    throw new AppError('Authentication required.', 401);
  }

  if (!req.file) {
    throw new AppError('Please select a PDF file.', 400);
  }

  validatePdf(req.file.buffer);

  const document = await saveDocument(user.id, {
    originalName: req.file.originalname,
    buffer: req.file.buffer,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });

  res.status(201).json({
    success: true,
    message: 'Document uploaded successfully.',
    data: document,
  });
}
