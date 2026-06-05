type InfoCardProps = {
  title: string;
  description: string;
  items?: string[];
};

export function InfoCard({ title, description, items = [] }: InfoCardProps) {
  return (
    <section className="soft-card rounded-3xl p-6">
      <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>

      <p className="mt-3 leading-7 text-neutral-400">{description}</p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-6 text-neutral-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}