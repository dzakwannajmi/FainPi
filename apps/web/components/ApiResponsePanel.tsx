import type { ApiResult } from "@/types/api";
import { StatusBadge } from "@/components/StatusBadge";

type ApiResponsePanelProps = {
  title: string;
  result: ApiResult;
  minHeightClassName?: string;
};

export function ApiResponsePanel({
  title,
  result,
  minHeightClassName = "min-h-[360px]",
}: ApiResponsePanelProps) {
  return (
    <section className="min-w-0 max-w-full space-y-5">
      <h2 className="break-words font-body text-3xl font-medium tracking-[-0.05em] text-white md:text-4xl">
        {title}
      </h2>

      <div className="liquid-glass min-w-0 max-w-full rounded-[2rem] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-white/40">Response status</p>
          <StatusBadge status={result.status} />
        </div>

        <pre
          className={`${minHeightClassName} max-h-[68vh] max-w-full overflow-auto whitespace-pre rounded-[1.5rem] border border-white/10 bg-black/70 p-5 text-[11px] leading-6 text-white/80 md:text-sm md:leading-7`}
        >
          <code className="block min-w-max">{JSON.stringify(result.body, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}