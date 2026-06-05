type InfoCardProps = {
  title: string;
  description: string;
  items?: string[];
};

export function InfoCard({ title, description, items = [] }: InfoCardProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <p className="mt-3 leading-7 text-slate-300">{description}</p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}