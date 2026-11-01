interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <h2 className="font-display text-2xl font-bold">{title}</h2>

      <p className="mt-3 text-muted">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-hover"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
