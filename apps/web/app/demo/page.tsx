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
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Demo
          </p>

          <h1 className="text-4xl font-bold text-white">
            Test FainPi protected endpoints.
          </h1>

          <p className="mt-4 leading-7 text-slate-300">
            This page demonstrates the API paywall layer. A premium endpoint
            returns <span className="font-mono text-yellow-300">402</span>{" "}
            without payment, then returns protected data after the demo payment
            receipt is sent.
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
                  ? "rounded-xl bg-cyan-400 px-5 py-4 text-left font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                  : "rounded-xl border border-slate-700 px-5 py-4 text-left font-semibold text-slate-100 transition hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              }
            >
              <span className="block">{action.label}</span>
              <span
                className={
                  action.variant === "primary"
                    ? "mt-1 block text-sm font-normal text-slate-800"
                    : "mt-1 block text-sm font-normal text-slate-400"
                }
              >
                {action.description}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Mock dashboard
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <DashboardMetric label="Total requests" value="24" />
            <DashboardMetric label="Paid requests" value="7" />
            <DashboardMetric label="Estimated earnings" value="0.07 XLM" />
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
          <h2 className="font-semibold text-yellow-100">MVP note</h2>
          <p className="mt-2 text-sm leading-7 text-yellow-50/80">
            This demo page focuses on the HTTP API paywall behavior. The wallet
            payment flow is available on the Payment page.
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
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}