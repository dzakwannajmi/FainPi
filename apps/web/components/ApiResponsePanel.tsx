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
      <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>

      <div className="soft-card rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">Response status</p>
          <StatusBadge status={result.status} />
        </div>

        <pre
          className={`${minHeightClassName} code-panel overflow-auto rounded-2xl p-5 text-sm leading-7`}
        >
          <code>{JSON.stringify(result.body, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}