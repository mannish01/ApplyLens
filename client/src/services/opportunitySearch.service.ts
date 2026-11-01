import type { OpportunityFilters, PaginatedOpportunitiesResponse } from '../types/pagination.types';

import { apiRequest } from '../lib/apiClient';

export async function searchOpportunities(
  filters: OpportunityFilters,
  signal?: AbortSignal,
): Promise<PaginatedOpportunitiesResponse> {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set('search', filters.search.trim());
  }

  if (filters.type !== 'All') {
    params.set('type', filters.type);
  }

  params.set('page', String(filters.page));
  params.set('limit', String(filters.limit));

  const result = await apiRequest<PaginatedOpportunitiesResponse>(
    `/opportunities?${params.toString()}`,
    { signal },
  );

  if (
    !Array.isArray(result.data) ||
    !result.pagination ||
    !Number.isInteger(result.pagination.page) ||
    !Number.isInteger(result.pagination.totalPages)
  ) {
    throw new Error('Invalid paginated opportunities response.');
  }

  return result;
}
