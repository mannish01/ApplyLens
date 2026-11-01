
import { Link } from 'react-router';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { opportunities } from '../data/opportunity';

function Dashboard() {
  const { user } = useAuth();

  const firstName = user?.fullName?.trim().split(' ')[0] || 'there';

  const featuredOpportunities = opportunities.slice(0, 3);

  const opportunityTypes = [
    {
      title: 'Internships',
      description: 'Gain practical experience',
      icon: BriefcaseBusiness,
      color: 'bg-blue-50 text-blue-700',
      type: 'Internship',
    },
    {
      title: 'Full-time roles',
      description: 'Start your career',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-700',
      type: 'Full-time',
    },
    {
      title: 'Scholarships',
      description: 'Find financial support',
      icon: GraduationCap,
      color: 'bg-amber-50 text-amber-700',
      type: 'Scholarship',
    },
  ];

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
      {/* Sidebar + Main content */}
      <div className="mx-auto flex min-h-screen max-w-[1600px]">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface px-6 py-8 lg:flex lg:flex-col">
          <Link
            to="/dashboard"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Apply<span className="text-primary">Lens.</span>
          </Link>

          <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Workspace
          </p>

          <nav className="mt-4 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/explore"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-background hover:text-text"
            >
              <Search size={18} />
              Explore opportunities
            </Link>

            <Link
              to="/saved-opportunities"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-background hover:text-text"
            >
              <Bookmark size={18} />
              Saved opportunities
            </Link>

            <Link
              to="/profile/setup"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-background hover:text-text"
            >
              <CircleUserRound size={18} />
              My profile
            </Link>
          </nav>

          <div className="mt-auto rounded-2xl bg-background p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles size={18} />
            </div>

            <p className="mt-4 font-display text-sm font-bold">
              Your next opportunity is waiting.
            </p>

            <p className="mt-2 text-xs leading-5 text-muted">
              Keep exploring and take one step closer to your goals.
            </p>

            <Link
              to="/explore"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary"
            >
              Explore now <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">

          {/* Top navigation */}
          <header className="flex items-center justify-between border-b border-border bg-background px-5 py-5 md:px-8">
            <div className="lg:hidden">
              <Link
                to="/dashboard"
                className="font-display text-xl font-bold"
              >
                Apply<span className="text-primary">Lens.</span>
              </Link>
            </div>

            <p className="hidden text-sm text-muted lg:block">
              Workspace / <span className="font-semibold text-text">Dashboard</span>
            </p>

            <div className="flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block text-sm font-semibold">
                  {user?.fullName}
                </span>
                <span className="block text-xs text-muted">
                  Student account
                </span>
              </span>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {firstName.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

            {/* Welcome section */}
            <section className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-10">
              <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles size={14} />
                  YOUR CAREER WORKSPACE
                </div>

                <h1 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
                  Good to see you, {firstName}.
                  <br />
                  <span className="text-primary">
                    What's next?
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
                  Your journey doesn't need to be figured out all at once.
                  Discover opportunities, organize your applications and
                  make progress one step at a time.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    Find opportunities
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    to="/profile/setup"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                  >
                    Complete profile
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <span className="absolute bottom-7 right-8 hidden -rotate-6 font-display text-sm font-semibold text-primary/50 xl:block">
                small steps, big futures ↗
              </span>
            </section>

            {/* Opportunity categories */}
            <section className="mt-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    Discover / 01
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    Explore your possibilities.
                  </h2>
                </div>

                <Link
                  to="/explore"
                  className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
                >
                  View all <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {opportunityTypes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.type}
                      to={`/explore?type=${encodeURIComponent(item.type)}`}
                      className="group rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>
                          <Icon size={21} />
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="text-muted transition group-hover:text-primary"
                        />
                      </div>

                      <h3 className="mt-5 font-display text-lg font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Featured opportunities */}
            <section className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    Handpicked / 02
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    Opportunities to explore.
                  </h2>

                  <p className="mt-2 text-sm text-muted">
                    A starting point for your next move.
                  </p>
                </div>

                <Link
                  to="/explore"
                  className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
                >
                  Browse all <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {featuredOpportunities.map((opportunity) => (
                  <article
                    key={opportunity.id}
                    className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                        {opportunity.type}
                      </span>

                      <span className="text-xs text-muted">
                        #{opportunity.id}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold leading-snug transition group-hover:text-primary">
                      {opportunity.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-muted">
                      {opportunity.company}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <BriefcaseBusiness size={14} />
                        {opportunity.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDeadline(opportunity.deadline)}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {opportunity.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-background px-2.5 py-1.5 text-xs text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-border pt-5 mt-6">
                      <div>
                        <p className="text-[11px] text-muted">
                          Compensation
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {opportunity.stipend}
                        </p>
                      </div>

                      <Link
                        to={`/explore`}
                        className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary"
                      >
                        Explore <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Application tracker */}
            <section className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    Stay organized / 03
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    Your application tracker.
                  </h2>

                  <p className="mt-2 text-sm text-muted">
                    Keep your applications and important documents in one place.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Target size={21} />
                    </div>

                    <span className="text-xs font-semibold text-muted">
                      APPLICATIONS
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold">
                    Your journey starts here.
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                    Track applications, interviews and offers as you apply
                    for opportunities. Your application activity will appear here.
                  </p>

                  <Link
                    to="/explore"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    Find your first opportunity
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <FileText size={21} />
                    </div>

                    <span className="text-xs font-semibold text-muted">
                      DOCUMENTS
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold">
                    Get your documents ready.
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                    Keep important notices and opportunity documents organized.
                    ApplyLens will help you understand their eligibility criteria.
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted">
                    <CheckCircle2 size={16} />
                    Document workspace coming soon
                  </span>
                </div>
              </div>
            </section>

            {/* Bottom banner */}
            <section className="mt-14 overflow-hidden rounded-3xl bg-[#171717] p-7 text-white md:p-10">
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#AFC0FF]">
                    <Sparkles size={17} />
                    A little reminder
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                    Your next opportunity won't find itself.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Explore consistently, build your skills and keep moving
                    forward. Your future is built through the steps you take today.
                  </p>
                </div>

                <Link
                  to="/explore"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-text transition hover:bg-[#AFC0FF]"
                >
                  Explore opportunities
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </section>

            <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
              <p>© 2026 ApplyLens. Built for ambitious students.</p>
              <p>Discover · Prepare · Apply · Grow.</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
