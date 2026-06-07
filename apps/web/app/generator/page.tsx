"use client";

import { useMemo, useState } from "react";
import { generateExpressSnippet } from "@/lib/generateSnippet";

export default function GeneratorPage() {
  const [endpointPath, setEndpointPath] = useState("/api/premium-data");
  const [amount, setAmount] = useState("0.01");
  const [currency, setCurrency] = useState("XLM");
  const [recipient, setRecipient] = useState(
    "REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY"
  );
  const [description, setDescription] = useState("Premium API access");

  const endpointNeedsSlash =
    endpointPath.trim().length > 0 && !endpointPath.trim().startsWith("/");

  const hasMissingFields =
    !endpointPath.trim() ||
    !amount.trim() ||
    !currency.trim() ||
    !recipient.trim() ||
    !description.trim();

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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="min-w-0 space-y-6">
        <div>
          <p className="eyebrow-text mb-3">Generator</p>

          <h1 className="page-title-compact max-w-xl text-white">
            Generate an API paywall starter.
          </h1>

          <p className="body-copy mt-4 max-w-xl">
            Fill in your endpoint details and FainPi will generate an Express
            middleware starter snippet. The snippet demonstrates the HTTP 402
            Payment Required flow before premium data is returned.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-[#111111] p-5">
          <h2 className="font-bold text-white">How to use this generator</h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-neutral-400">
            <li>Enter your protected endpoint path.</li>
            <li>Set the price and payment asset.</li>
            <li>Set your Stellar recipient address.</li>
            <li>Copy the generated Express middleware starter.</li>
            <li>
              Replace the demo receipt header with full Stellar MPP Charge
              verification in the next integration phase.
            </li>
          </ol>
        </div>

        <div className="liquid-glass rounded-[2rem] p-5">
          <h2 className="text-sm font-semibold text-white">
            Implementation note
          </h2>

          <p className="mt-2 text-sm leading-7 text-white/55">
            The generated snippet is intended for developers who want to protect
            their own Express API server. The live FainPi demo uses internal
            Next.js API routes so the project can run cleanly on Vercel without
            a separate backend deployment.
          </p>
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
            {endpointNeedsSlash ? (
              <p className="text-xs leading-5 text-yellow-200/70">
                Tip: endpoint paths usually start with /. The generated snippet
                will normalize it automatically.
              </p>
            ) : null}
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
              placeholder="Enter your Stellar recipient public key"
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

          {hasMissingFields ? (
            <div className="rounded-2xl border border-yellow-200/20 bg-yellow-200/10 p-4 text-sm leading-6 text-yellow-100/80">
              Some fields are empty. The generated snippet will use safe default
              values, but filling every field makes the output clearer.
            </div>
          ) : null}
        </div>
      </section>

      <section className="min-w-0 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Generated Express starter snippet
            </h2>
            <p className="mt-1 text-sm text-white/45">
              MVP demo-header flow, not production payment verification.
            </p>
          </div>

          <button onClick={copySnippet} className="primary-button px-5 py-3">
            Copy
          </button>
        </div>

        <pre className="code-panel max-h-[720px] max-w-full overflow-auto whitespace-pre rounded-3xl p-5 text-sm leading-7">
          <code className="block min-w-max">{snippet}</code>
        </pre>
      </section>
    </div>
  );
}
