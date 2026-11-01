import { useQuery } from '@tanstack/react-query';
import { getOpportunities } from '../services/opportunity.service';
import { queryKeys } from '../lib/queryKeys';
import { useSavedOpportunities } from '../hooks/useSavedOpportunities';
import { useUnsaveOpportunity } from '../hooks/useUnsaveOpportunity';
import OpportunityCard from '../components/shared/OpportunityCard';
import EmptyState from '../components/shared/EmptyState';
import LoadingState from '../components/shared/LoadingState';

function SavedOpportunities() {
  const {
    data: opportunities,
    isPending: isOpportunitiesPending,
    isError: isOpportunitiesError,
    error: opportunitiesError,
  } = useQuery({
    queryKey: queryKeys.opportunities,
    queryFn: ({ signal }) => getOpportunities(signal),
  });

  const {
    data: savedIds,
    isPending: isSavedPending,
    isError: isSavedError,
    error: savedError,
  } = useSavedOpportunities();

  const unsaveMutation = useUnsaveOpportunity();

  if (isOpportunitiesPending || isSavedPending) {
    return <LoadingState />;
  }

  if (isOpportunitiesError || isSavedError) {
    return (
      <main className="px-6 py-12">
        <p className="text-danger">{opportunitiesError?.message || savedError?.message}</p>
      </main>
    );
  }

  const savedOpportunities = opportunities.filter((opportunity) =>
    savedIds.includes(opportunity.id),
  );

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl font-bold">Saved opportunities</h1>

        <p className="mb-8 mt-2 text-muted">Your shortlisted opportunities in one place.</p>

        {savedOpportunities.length === 0 ? (
          <EmptyState
            title="No saved opportunities"
            description="Explore opportunities and save the ones you want to revisit."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved
                isSaving={unsaveMutation.isPending && unsaveMutation.variables === opportunity.id}
                onUnsave={(id) => unsaveMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedOpportunities;
