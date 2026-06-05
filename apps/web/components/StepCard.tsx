type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
        {step}
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-300">{description}</p>
    </div>
  );
}