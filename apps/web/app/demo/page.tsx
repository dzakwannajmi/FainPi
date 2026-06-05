"use client";

import { useState } from "react";
import { ApiResponsePanel } from "@/components/ApiResponsePanel";
import { callDemoEndpoint, createEmptyApiResult } from "@/lib/apiClient";
import type { ApiResult } from "@/types/api";

const demoActions = [
  {
    label: "Call free endpoint",
    description: "Returns a public API response without payment.",
    path: "/api/free",
    paid: false,
    variant: "secondary",
  },
  {
    label: "Call premium endpoint without payment",
    description: "Returns 402 Payment Required.",
    path: "/api/premium-data",
    paid: false,
    variant: "secondary",
  },
  {
    label: "Pay and access premium endpoint",
    description: "Sends the demo payment header and unlocks premium data.",
    path: "/api/premium-data",
    paid: true,
    variant: "primary",
  },
] as const;

export default function DemoPage() {
  const [result, setResult] = useState<ApiResult>(
    createEmptyApiResult("No request yet.")
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleDemoAction(path: string, paid: boolean) {
    setIsLoading(true);

    const apiResult = await callDemoEndpoint(path, {
      paid,
    });

    setResult(apiResult);
    setIsLoading(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-6">
        <div>
          <p className="eyebrow-text mb-3">Demo</p>

          <h1 className="page-title-compact max-w-md text-white">
            Test the API paywall.
          </h1>

          <p className="body-copy mt-4 max-w-lg">
            This page demonstrates the API layer. A premium endpoint returns{" "}
            <span className="font-mono font-bold text-white">402</span> without
            payment, then returns protected data after the demo receipt is sent.
          </p>
        </div>

        <div className="grid gap-3">
          {demoActions.map((action) => (
            <button
              key={`${action.path}-${action.label}`}
              onClick={() => handleDemoAction(action.path, action.paid)}
              disabled={isLoading}
              className={
                action.variant === "primary"
                  ? "primary-button px-5 py-4 text-left disabled:cursor-not-allowed disabled:opacity-50"
                  : "outline-button px-5 py-4 text-left disabled:cursor-not-allowed disabled:opacity-50"
              }
            >
              <span className="block">{action.label}</span>
              <span className="mt-1 block text-sm font-normal opacity-70">
                {action.description}
              </span>
            </button>
          ))}
        </div>

        <div className="soft-card rounded-3xl p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Mock dashboard</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <DashboardMetric label="Total requests" value="24" />
            <DashboardMetric label="Paid requests" value="7" />
            <DashboardMetric label="Estimated earnings" value="0.07 XLM" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-[#111111] p-5">
          <h2 className="font-bold text-white">MVP note</h2>
          <p className="mt-2 text-sm leading-7 text-neutral-400">
            This demo focuses on HTTP 402 behavior. The wallet payment flow is
            available on the Payment page.
          </p>
        </div>
      </section>

      <ApiResponsePanel title="API response" result={result} />
    </div>
  );
}

function DashboardMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-extrabold text-white">{value}</p>
    </div>
  );
}