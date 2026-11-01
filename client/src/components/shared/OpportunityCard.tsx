import type { Opportunity } from '../../types/opportunity.types';
import { memo } from 'react';
interface OpportunityCardProps {
  opportunity: Opportunity;
  isSaved?: boolean;
  onSave?: (id: number) => void;
  onUnsave?: (id: number) => void;
  isSaving?: boolean;
}

function OpportunityCard({
  opportunity,
  isSaved = false,
  onSave,
  onUnsave,
  isSaving = false,
}: OpportunityCardProps) {
  const handleSave = () => {
    if (isSaved) {
      onUnsave?.(opportunity.id);
    } else {
      onSave?.(opportunity.id);
    }
  };

  return (
    <article className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-sm font-medium text-primary">{opportunity.type}</span>

          <h2 className="mt-2 font-display text-xl font-bold">{opportunity.title}</h2>

          <p className="mt-1 text-sm text-muted">{opportunity.company}</p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || (!onSave && !onUnsave)}
          aria-pressed={isSaved}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="mt-5 space-y-2 text-sm text-muted">
        <p>Location: {opportunity.location}</p>
        <p>Stipend: {opportunity.stipend}</p>
        <p>Deadline: {opportunity.deadline}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {opportunity.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-elevated px-3 py-1 text-xs">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default memo(OpportunityCard);
