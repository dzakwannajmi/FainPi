import Link from "next/link";

type FeatureLinkCardProps = {
  href: string;
  index: string;
  title: string;
  description: string;
  meta: string;
};

export function FeatureLinkCard({
  href,
  index,
  title,
  description,
  meta,
}: FeatureLinkCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="liquid-glass min-h-[260px] rounded-[2rem] p-7 transition duration-300 hover:bg-white/[0.04]">
        <div className="flex items-start justify-between gap-6">
          <span className="text-sm font-medium text-white/45">{index}</span>

          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70 transition group-hover:border-white group-hover:text-white">
            {meta}
          </span>
        </div>

        <div className="mt-16">
          <h3 className="font-body text-2xl font-medium tracking-[-0.04em] text-white md:text-3xl">
            {title}
          </h3>

          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white">
          <span>Open</span>
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </article>
    </Link>
  );
}