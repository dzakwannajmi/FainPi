type StatusBadgeProps = {
  status: number | null;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status ?? "N/A";
  const className = getStatusClassName(status);

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}

function getStatusClassName(status: number | null) {
  if (status === null) {
    return "bg-slate-800 text-slate-300";
  }

  if (status >= 200 && status < 300) {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (status === 402) {
    return "bg-yellow-400/10 text-yellow-300";
  }

  if (status >= 400) {
    return "bg-red-400/10 text-red-300";
  }

  return "bg-slate-800 text-slate-300";
}