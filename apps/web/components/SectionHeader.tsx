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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="font-body text-4xl font-medium leading-none tracking-[-0.06em] text-white md:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-8 text-white/55 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}