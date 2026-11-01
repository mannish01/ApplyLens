import { useQuery } from '@tanstack/react-query';

import { getSavedOpportunityIds } from '../services/savedOpportunity.service';
import { queryKeys } from '../lib/queryKeys';

export function useSavedOpportunities() {
  return useQuery({
    queryKey: queryKeys.savedOpportunities,
    queryFn: ({ signal }) => getSavedOpportunityIds(signal),
  });
}
