export const Spinner = ({ label = 'Loading' }) => (
  <span className="inline-flex items-center gap-3 text-graphite" role="status">
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <span className="text-micro">{label}</span>
  </span>
);
