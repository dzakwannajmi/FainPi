type InfoCardProps = {
  title: string;
  description: string;
  items?: string[];
};

export function InfoCard({ title, description, items = [] }: InfoCardProps) {
  return (
    <section className="liquid-glass rounded-[2rem] p-6">
      <h2 className="font-body text-xl font-medium tracking-[-0.03em] text-white">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-white/55">{description}</p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-white/60">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}