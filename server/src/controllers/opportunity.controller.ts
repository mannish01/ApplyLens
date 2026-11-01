import type { Request, Response } from 'express';

import {
  findAllOpportunities,
  findOpportunityById,
} from '../services/opportunity.service.js';

import { AppError } from '../utils/AppError.js';

export async function getOpportunities(_req: Request, res: Response) {
  const opportunities = await findAllOpportunities();

  res.status(200).json({
    success: true,
    data: opportunities,
  });
}

export async function getOpportunityById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid opportunity ID.', 400);
  }

  const opportunity = await findOpportunityById(id);

  if (!opportunity) {
    throw new AppError('Opportunity not found.', 404);
  }

  res.status(200).json({
    success: true,
    data: opportunity,
  });
}
