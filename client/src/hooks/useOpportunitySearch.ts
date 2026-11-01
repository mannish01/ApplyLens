import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../lib/queryKeys';
import { searchOpportunities } from '../services/opportunitySearch.service';
import type { OpportunityFilters } from '../types/pagination.types';

export function useOpportunitySearch(filters: OpportunityFilters) {
  return useQuery({
    queryKey: queryKeys.opportunitySearch(filters),

    queryFn: ({ signal }) => searchOpportunities(filters, signal),

    placeholderData: (previousData) => previousData,
  });
}
