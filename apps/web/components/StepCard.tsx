type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="liquid-glass rounded-[2rem] p-6 transition duration-300 hover:bg-white/[0.04]">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
        {step}
      </div>

      <h3 className="font-body text-lg font-medium tracking-[-0.03em] text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/55">{description}</p>
    </div>
  );
}