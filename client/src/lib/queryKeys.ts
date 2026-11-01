import type { OpportunityFilters } from '../types/pagination.types';

export const queryKeys = {
  opportunities: ['opportunities'] as const,

  opportunitySearch: (filters: OpportunityFilters) => ['opportunity-search', filters] as const,

  opportunity: (id: number) => ['opportunities', id] as const,

  studentProfile: ['student-profile'] as const,

  savedOpportunities: ['saved-opportunities'] as const,

  applications: ['applications'] as const,
};
