import { useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  X,
} from 'lucide-react';

import { opportunities } from '../data/opportunity';
import type { OpportunityType } from '../types/opportunity.types';

const filters: (OpportunityType | 'All')[] = ['All', 'Internship', 'Full-time', 'Scholarship'];

function Explore() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'All'>('All');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const searchableText = [
        opportunity.title,
        opportunity.company,
        opportunity.location,
        ...opportunity.skills,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchableText.includes(search.trim().toLowerCase());

      const matchesType = selectedType === 'All' || opportunity.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [search, selectedType]);

  const getTypeIcon = (type: OpportunityType) => {
    switch (type) {
      case 'Internship':
        return <BriefcaseBusiness size={14} />;
      case 'Full-time':
        return <Code2 size={14} />;
      case 'Scholarship':
        return <GraduationCap size={14} />;
      default:
        return <BriefcaseBusiness size={14} />;
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) {
      return deadline;
    }

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="/explore" className="font-display text-2xl font-bold tracking-tight">
            Apply<span className="text-primary">Lens.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            <a href="/explore" className="text-text">
              Explore
            </a>
            <a href="/saved-opportunities" className="transition hover:text-primary">
              Saved
            </a>
            <a href="/dashboard" className="transition hover:text-primary">
              Dashboard
            </a>
          </div>

          <a
            href="/login"
            className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            Sign in <ArrowUpRight className="ml-1 inline" size={15} />
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-12">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles size={14} />
              Your next opportunity starts here
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Find opportunities.
              <br />
              <span className="text-primary">Build your future.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
              Discover internships, scholarships and career opportunities that match your skills,
              interests and ambitions.
            </p>

            <div className="mt-9 flex flex-col gap-3 rounded-2xl border border-border bg-background p-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search size={19} className="shrink-0 text-muted" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search roles, companies, skills..."
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                    className="text-muted hover:text-text"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-border px-3 pt-2 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <SlidersHorizontal size={17} className="text-muted" />

                <select
                  value={selectedType}
                  onChange={(event) =>
                    setSelectedType(event.target.value as OpportunityType | 'All')
                  }
                  className="w-full cursor-pointer bg-transparent py-3 text-sm font-medium outline-none sm:w-auto"
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter === 'All' ? 'All opportunities' : filter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3 text-xs text-muted">
            <span className="font-semibold text-text">Popular searches:</span>
            {['React', 'Python', 'AI/ML', 'Frontend'].map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setSearch(skill)}
                className="underline decoration-border underline-offset-4 transition hover:text-primary"
              >
                {skill}
              </button>
            ))}
          </div>

          <span className="absolute bottom-8 right-10 hidden -rotate-6 font-display text-sm font-semibold text-primary/60 lg:block">
            less scrolling, more growing ↗
          </span>
        </section>

        {/* Results heading */}
        <section className="mt-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Opportunity board / 01
              </p>

              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Explore opportunities<span className="text-primary">.</span>
              </h2>

              <p className="mt-2 text-sm text-muted">
                Find the right place to take your next step.
              </p>
            </div>

            <div className="text-sm text-muted">
              <span className="font-display text-3xl font-bold text-text">
                {filteredOpportunities.length.toString().padStart(2, '0')}
              </span>
              <span className="ml-2">opportunities found</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-5">
            {filters.map((filter) => {
              const active = selectedType === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedType(filter)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-border bg-surface text-muted hover:border-primary hover:text-primary'
                  }`}
                >
                  {filter === 'All' ? 'All opportunities' : filter}
                </button>
              );
            })}
          </div>

          {/* Opportunity grid */}
          {filteredOpportunities.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredOpportunities.map((opportunity, index) => (
                <article
                  key={opportunity.id}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                      {getTypeIcon(opportunity.type)}
                      {opportunity.type}
                    </span>

                    <span className="font-display text-xs text-muted">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-display text-xl font-bold leading-snug tracking-tight transition group-hover:text-primary">
                      {opportunity.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-muted">{opportunity.company}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {opportunity.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {formatDeadline(opportunity.deadline)}
                    </span>
                  </div>

                  <div className="mt-5 border-t border-border pt-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                      Skills required
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-background px-2.5 py-1.5 text-xs text-text"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                    <div>
                      <p className="text-[11px] text-muted">Compensation</p>
                      <p className="mt-1 text-sm font-bold">{opportunity.stipend}</p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2.5 text-xs font-semibold text-white transition group-hover:bg-primary">
                      Explore <ArrowUpRight size={15} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface px-5 py-16 text-center">
              <Search size={30} className="mx-auto text-muted" />

              <h3 className="mt-4 font-display text-xl font-bold">No opportunities found</h3>

              <p className="mt-2 text-sm text-muted">Try another keyword or change your filters.</p>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedType('All');
                }}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Bottom note */}
        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© 2026 ApplyLens. Find your next opportunity.</p>
          <p>Made for students, built for possibilities.</p>
        </footer>
      </div>
    </main>
  );
}

export default Explore;
