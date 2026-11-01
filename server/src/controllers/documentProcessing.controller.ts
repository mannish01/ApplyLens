
import type { Request, Response } from 'express';

import { processDocument } from '../services/documentProcessing.service.js';
import { AppError } from '../utils/AppError.js';

export async function processUploadedDocument(
  req: Request,
  res: Response,
) {
  const user = res.locals.user;
  const documentId = req.params.id;

if (typeof documentId !== 'string' || !documentId.trim()) {
  throw new AppError('Document ID is required.', 400);
}

  // Ensure the user is authenticated.
  if (!user) {
    throw new AppError('Authentication required.', 401);
  }

  // Validate the document ID.
  if (!documentId) {
    throw new AppError('Document ID is required.', 400);
  }

  // Process only the authenticated user's document.
  const result = await processDocument(
    documentId,
    user.id,
  );

  res.status(200).json({
    success: true,
    message: 'Document processed successfully.',
    data: result,
  });
}
