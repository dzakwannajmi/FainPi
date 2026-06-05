"use client";

import { useMemo, useState } from "react";
import { generateExpressSnippet } from "@/lib/generateSnippet";

export default function GeneratorPage() {
  const [endpointPath, setEndpointPath] = useState("/api/premium-data");
  const [amount, setAmount] = useState("0.01");
  const [currency, setCurrency] = useState("USDC");
  const [recipient, setRecipient] = useState(
    "G_REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY"
  );
  const [description, setDescription] = useState("Premium API access");

  const snippet = useMemo(() => {
    return generateExpressSnippet({
      endpointPath,
      amount,
      currency,
      recipient,
      description,
    });
  }, [endpointPath, amount, currency, recipient, description]);

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Generator
          </p>
          <h1 className="text-4xl font-bold text-white">
            Generate a paid API middleware.
          </h1>
          <p className="mt-4 leading-7 text-slate-300">
            Fill in your endpoint details and FainPi will generate an
            integration-ready Express middleware snippet for a pay-per-request
            API flow.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Endpoint path
            </span>
            <input
              value={endpointPath}
              onChange={(event) => setEndpointPath(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              placeholder="/api/premium-data"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Price per request
            </span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              placeholder="0.01"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Currency
            </span>
            <input
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              placeholder="USDC"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Stellar recipient address
            </span>
            <input
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              placeholder="G..."
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Description
            </span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Premium API access"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">
            Generated Express snippet
          </h2>

          <button
            onClick={copySnippet}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Copy
          </button>
        </div>

        <pre className="max-h-[720px] overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-7 text-slate-300">
          <code>{snippet}</code>
        </pre>
      </section>
    </div>
  );
}