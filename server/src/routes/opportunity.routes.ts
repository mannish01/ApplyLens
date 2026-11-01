import { Router } from 'express';

import {
  getOpportunities,
  getOpportunityById,
} from '../controllers/opportunity.controller.js';

import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

// Public routes
router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);

// Admin-only routes will be added here.
// Example:
// router.post('/', requireAuth, requireRole('ADMIN'), createOpportunity);

export default router;
