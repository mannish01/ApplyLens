import { prisma } from '../lib/prisma.js';

export function findAllOpportunities() {
  return prisma.opportunity.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function findOpportunityById(id: number) {
  return prisma.opportunity.findUnique({
    where: {
      id,
    },
  });
}
