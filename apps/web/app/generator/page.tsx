"use client";

import { useMemo, useState } from "react";
import { generateExpressSnippet } from "@/lib/generateSnippet";

export default function GeneratorPage() {
  const [endpointPath, setEndpointPath] = useState("/api/premium-data");
  const [amount, setAmount] = useState("0.01");
  const [currency, setCurrency] = useState("XLM");
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
          <p className="eyebrow-text mb-3">Generator</p>

          <h1 className="page-title-compact max-w-xl text-white">
            Generate a paid API middleware.
          </h1>

          <p className="body-copy mt-4 max-w-xl">
            Fill in your endpoint details and FainPi will generate an
            integration-ready Express middleware snippet. This snippet
            demonstrates how your API can return HTTP 402 Payment Required
            before sending premium data.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-[#111111] p-5">
          <h2 className="font-bold text-white">How to use this generator</h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-neutral-400">
            <li>Enter your protected endpoint path.</li>
            <li>Set the price and payment asset.</li>
            <li>Set your Stellar recipient address.</li>
            <li>Copy the generated middleware snippet.</li>
            <li>Connect it later with full Stellar MPP Charge verification.</li>
          </ol>
        </div>

        <div className="soft-card space-y-4 rounded-3xl p-6">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-300">
              Endpoint path
            </span>
            <input
              value={endpointPath}
              onChange={(event) => setEndpointPath(event.target.value)}
              className="input-field"
              placeholder="/api/premium-data"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-300">
              Price per request
            </span>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="input-field"
              placeholder="0.01"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-300">
              Currency
            </span>
            <input
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="input-field"
              placeholder="XLM"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-300">
              Stellar recipient address
            </span>
            <input
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="input-field"
              placeholder="G..."
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-300">
              Description
            </span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="input-field"
              placeholder="Premium API access"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Generated Express snippet
          </h2>

          <button onClick={copySnippet} className="primary-button px-5 py-3">
            Copy
          </button>
        </div>

        <pre className="code-panel max-h-[720px] overflow-auto rounded-3xl p-5 text-sm leading-7">
          <code>{snippet}</code>
        </pre>
      </section>
    </div>
  );
}