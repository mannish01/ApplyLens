import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveOpportunity } from '../services/savedOpportunity.service';
import { queryKeys } from '../lib/queryKeys';

export function useSaveOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveOpportunity,

    onMutate: async (opportunityId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.savedOpportunities,
      });

      const previousSavedIds = queryClient.getQueryData<number[]>(queryKeys.savedOpportunities);

      queryClient.setQueryData<number[]>(queryKeys.savedOpportunities, (oldIds = []) => {
        return oldIds.includes(opportunityId) ? oldIds : [...oldIds, opportunityId];
      });

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
