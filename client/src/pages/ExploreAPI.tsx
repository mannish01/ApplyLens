import { useState } from 'react';

import { useDebounce } from '../hooks/useDebounce';
import { useOpportunitySearch } from '../hooks/useOpportunitySearch';

import OpportunityCard from '../components/shared/OpportunityCard';
import EmptyState from '../components/shared/EmptyState';
import LoadingState from '../components/shared/LoadingState';

import type { OpportunityType } from '../types/opportunity.types';
import ErrorState from '../components/shared/ErrorState';

function ExploreAPI() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'All'>('All');

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isPending, isError, error, refetch, isFetching, isPlaceholderData } =
    useOpportunitySearch({
      search: debouncedSearch,
      type: selectedType,
      page,
      limit: 9,
    });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value: OpportunityType | 'All') => {
    setSelectedType(value);
    setPage(1);
  };

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <ErrorState
            title="Unable to load opportunities"
            message={error.message}
            onRetry={() => refetch()}
          />
        </div>
      </main>
    );
  }

  const opportunities = data.data;
  const pagination = data.pagination;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Opportunity discovery
          </p>

          <h1 className="font-display text-4xl font-bold">Explore opportunities</h1>

          <p className="mt-2 text-muted">
            Discover internships, jobs and scholarships that match your goals.
          </p>
        </div>

        {/* Search and filters */}

        <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_220px]">
          <input
            type="search"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by title, company or skill..."
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-primary"
          />

          <select
            value={selectedType}
            onChange={(event) => handleTypeChange(event.target.value as OpportunityType | 'All')}
            className="rounded-xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary"
          >
            <option value="All">All opportunities</option>
            <option value="Internship">Internships</option>
            <option value="Full-time">Full-time</option>
            <option value="Scholarship">Scholarships</option>
          </select>
        </div>

        {/* Results information */}

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-muted">{pagination.total} opportunities found</p>

          {isFetching && <span className="text-sm text-muted">Updating results...</span>}
        </div>

        {/* Opportunity cards */}

        {opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities found"
            description="Try changing your search term or filters."
          />
        ) : (
          <div
            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              isPlaceholderData ? 'opacity-60' : ''
            }`}
          >
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}

        {/* Pagination */}

        {pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              disabled={page === 1 || isFetching}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-border bg-surface px-4 py-2 transition hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              disabled={page >= pagination.totalPages || isFetching || isPlaceholderData}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-border bg-surface px-4 py-2 transition hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default ExploreAPI;
