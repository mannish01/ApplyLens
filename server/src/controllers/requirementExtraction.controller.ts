
import type { Request, Response } from 'express';

import { extractRequirements } from '../services/requireExtraction.service.js';
import { AppError } from '../utils/AppError.js';

export async function extractDocumentRequirements(
  req: Request,
  res: Response,
) {
console.log('REQUIREMENT EXTRACTION CONTROLLER REACHED');
  const user = res.locals.user;
  const documentId = req.params.id;

  if (!user) {
    throw new AppError('Authentication required.', 401);
  }

  if (
    typeof documentId !== 'string' ||
    !documentId.trim()
  ) {
    throw new AppError('Document ID is required.', 400);
  }

  const result = await extractRequirements(
    documentId,
    user.id,
  );

  res.status(200).json({
    success: true,
    message: 'Requirements extracted successfully.',
    data: result,
  });
}
