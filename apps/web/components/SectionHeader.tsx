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
      {eyebrow ? <p className="eyebrow-text mb-3">{eyebrow}</p> : null}

      <h1 className="page-title-compact text-white">{title}</h1>

      {description ? <p className="body-copy mt-4">{description}</p> : null}
    </div>
  );
}