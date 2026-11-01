import { Router } from 'express';

import { requireAuth } from '../middleware/requireAuth.js';
import { uploadPdf } from '../middleware/upload.js';
import { uploadDocument } from '../controllers/document.controller.js';
import { processUploadedDocument } from '../controllers/documentProcessing.controller.js';
import { extractDocumentRequirements } from '../controllers/requirementExtraction.controller.js';
const router = Router();

router.post(
  '/',
  requireAuth,
  uploadPdf.single('file'),
  uploadDocument,
);

router.post(
  '/:id/process',
  requireAuth,
  processUploadedDocument,
);

router.post(
  '/:id/extract-requirements',
  requireAuth,
  extractDocumentRequirements,
);

export default router;
