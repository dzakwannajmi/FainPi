type StatusBadgeProps = {
  status: number | null;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status ?? "N/A";
  const className = getStatusClassName(status);

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {label}
    </span>
  );
}

function getStatusClassName(status: number | null) {
  if (status === null) {
    return "bg-neutral-800 text-neutral-300";
  }

  if (status >= 200 && status < 300) {
    return "bg-white text-black";
  }

  if (status === 402) {
    return "bg-neutral-200 text-black";
  }

  if (status >= 400) {
    return "bg-red-500 text-white";
  }

  return "bg-neutral-800 text-neutral-300";
}