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
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-400">Response status</p>
          <StatusBadge status={result.status} />
        </div>

        <pre
          className={`${minHeightClassName} overflow-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-300`}
        >
          <code>{JSON.stringify(result.body, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}