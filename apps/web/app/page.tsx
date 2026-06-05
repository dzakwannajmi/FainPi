import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StepCard } from "@/components/StepCard";

const productSteps = [
  {
    step: "1",
    title: "Generate API paywall code",
    description:
      "Developers configure an endpoint path, price, currency, and recipient address. FainPi generates an Express middleware snippet for a paid API flow.",
  },
  {
    step: "2",
    title: "Protect premium API access",
    description:
      "The protected endpoint returns HTTP 402 Payment Required when accessed without a payment receipt.",
  },
  {
    step: "3",
    title: "Pay with Stellar",
    description:
      "Users connect Freighter, send a native XLM payment on Stellar Testnet, and receive a transaction hash.",
  },
  {
    step: "4",
    title: "Unlock premium response",
    description:
      "After payment submission, the demo flow unlocks the premium API response using the current MVP receipt header.",
  },
];

const useCases = [
  "Premium data API",
  "AI summary endpoint",
  "Campus dataset API",
  "File download endpoint",
  "Developer tool API",
  "API for AI agents",
];

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            Stellar Pay-Per-Request API Monetization
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl">
              Turn any API endpoint into a paid endpoint.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              FainPi helps developers demonstrate a lightweight API paywall
              flow using HTTP 402, Freighter wallet payment, and a Soroban
              paywall registry contract.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/generator"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Generate Middleware
            </Link>

            <Link
              href="/payment"
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Try Payment Flow
            </Link>

            <Link
              href="/docs"
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Read Docs
            </Link>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <p className="text-sm leading-7 text-yellow-50/90">
              <span className="font-semibold text-yellow-100">MVP note:</span>{" "}
              FainPi currently uses native XLM on Stellar Testnet and a demo
              receipt header for API unlock. Full Stellar MPP Charge
              verification is planned as the next integration phase.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-slate-300">
            <code>{`GET /api/premium-data

HTTP/1.1 402 Payment Required

{
  "error": "Payment Required",
  "amount": "0.01",
  "currency": "XLM",
  "network": "stellar:testnet"
}`}</code>
          </pre>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="How it works"
          title="A simple API paywall flow for developers."
          description="FainPi shows how a protected API endpoint can request payment before returning premium data."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productSteps.map((item) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          title="Problem"
          description="Small developers often have useful APIs, but setting up subscriptions, payment gateways, and billing systems is too complex for simple pay-per-request access."
        />

        <InfoCard
          title="Solution"
          description="FainPi demonstrates a lightweight API paywall where premium access requires a Stellar-based payment before the endpoint response is unlocked."
        />

        <InfoCard
          title="Smart contract role"
          description="The Soroban contract stores public API paywall metadata such as endpoint path, price, asset, payment network, and recipient address."
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Use cases"
          title="Built for small API monetization experiments."
          description="FainPi is useful for demonstrating how paid API access can work for premium data, AI tools, file endpoints, and agentic applications."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {useCases.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}