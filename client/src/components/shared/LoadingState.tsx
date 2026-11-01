function LoadingState() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />

      <p className="text-sm text-muted">Finding opportunities for you...</p>
    </div>
  );
}

export default LoadingState;
