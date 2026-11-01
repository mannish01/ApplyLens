import { useMutation, useQueryClient } from '@tanstack/react-query';

import { unsaveOpportunity } from '../services/savedOpportunity.service';
import { queryKeys } from '../lib/queryKeys';

export function useUnsaveOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsaveOpportunity,

    onMutate: async (opportunityId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.savedOpportunities,
      });

      const previousSavedIds = queryClient.getQueryData<number[]>(queryKeys.savedOpportunities);

      queryClient.setQueryData<number[]>(queryKeys.savedOpportunities, (oldIds = []) =>
        oldIds.filter((id) => id !== opportunityId),
      );

      return { previousSavedIds };
    },

    onError: (_error, _opportunityId, context) => {
      if (context?.previousSavedIds !== undefined) {
        queryClient.setQueryData(queryKeys.savedOpportunities, context.previousSavedIds);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.savedOpportunities,
      });
    },
  });
}
