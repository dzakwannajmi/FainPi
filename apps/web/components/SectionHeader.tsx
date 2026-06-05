type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}