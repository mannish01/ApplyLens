import multer from 'multer';
import { AppError } from '../utils/AppError.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const uploadPdf = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },

  fileFilter: (_req, file, callback) => {
    const isPdf =
      file.mimetype === 'application/pdf' &&
      file.originalname.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      callback(new AppError('Only PDF files are allowed.', 400));
      return;
    }

    callback(null, true);
  },
});
