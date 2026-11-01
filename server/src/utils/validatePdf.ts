import { AppError } from './AppError.js';

export function validatePdf(buffer: Buffer): void {
  const pdfSignature = buffer.subarray(0, 5).toString('ascii');

  if (pdfSignature !== '%PDF-') {
    throw new AppError('The uploaded file is not a valid PDF.', 400);
  }
}
