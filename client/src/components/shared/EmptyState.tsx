interface EmptyStateProps {
  title: string;
  description: string;
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-background text-xl">
        ↗
      </div>

      <h2 className="text-lg font-semibold text-text">{title}</h2>

      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
    </div>
  );
}

export default EmptyState;
