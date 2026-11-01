import { Router } from 'express';

import opportunityRoutes from './opportunity.routes.js';
import authRoutes from './auth.routes.js';
import documentRoutes from './document.routes.js';

const router = Router();

router.use('/documents', documentRoutes);
router.use('/opportunities', opportunityRoutes);
router.use('/auth', authRoutes);

export default router;
