type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="soft-card rounded-3xl p-6 transition hover:border-white/50">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black text-black">
        {step}
      </div>

      <h3 className="card-title text-white">{title}</h3>

      <p className="mt-3 leading-7 text-neutral-400">{description}</p>
    </div>
  );
}