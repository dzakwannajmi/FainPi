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
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-neutral-400">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="mt-4 text-base leading-8 text-neutral-400 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}