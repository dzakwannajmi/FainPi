import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StepCard } from "@/components/StepCard";

const productSteps = [
  {
    step: "1",
    title: "Generate paywall code",
    description:
      "Configure an endpoint path, price, asset, and recipient address. FainPi generates a middleware snippet for a paid API flow.",
  },
  {
    step: "2",
    title: "Protect premium access",
    description:
      "The protected endpoint returns HTTP 402 Payment Required when accessed without a payment receipt.",
  },
  {
    step: "3",
    title: "Pay with Stellar",
    description:
      "Users connect Freighter, send native XLM on Stellar Testnet, and receive a transaction hash.",
  },
  {
    step: "4",
    title: "Unlock the response",
    description:
      "After payment submission, the MVP unlocks the premium API response using the demo receipt flow.",
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
    <div className="space-y-24">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-bold text-black">
            Stellar Pay-Per-Request API Monetization
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-[-0.06em] text-white md:text-7xl">
              Turn any API into a paid endpoint.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-neutral-400">
              FainPi helps developers demonstrate a lightweight API paywall
              flow using HTTP 402, Freighter wallet payment, and a Soroban
              paywall registry contract.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/generator" className="primary-button px-6 py-3">
              Generate Middleware
            </Link>

            <Link href="/payment" className="outline-button px-6 py-3">
              Try Payment Flow
            </Link>

            <Link href="/docs" className="outline-button px-6 py-3">
              Read Docs
            </Link>
          </div>

          <div className="rounded-3xl border border-white/15 bg-[#111111] p-5">
            <p className="text-sm leading-7 text-neutral-300">
              <span className="font-bold text-white">MVP note:</span> FainPi
              currently uses native XLM on Stellar Testnet and a demo receipt
              header for API unlock. Full Stellar MPP Charge verification is
              planned as the next integration phase.
            </p>
          </div>
        </div>

        <div className="mono-card rounded-[2rem] p-6 shadow-2xl">
          <div className="mb-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-white" />
            <span className="h-3 w-3 rounded-full bg-neutral-500" />
            <span className="h-3 w-3 rounded-full bg-neutral-800" />
          </div>

          <pre className="code-panel overflow-x-auto rounded-3xl p-5 text-sm leading-7">
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
          title="A simple API paywall flow."
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
          title="Contract role"
          description="The Soroban contract stores public API paywall metadata such as endpoint path, price, asset, payment network, and recipient address."
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Use cases"
          title="Built for small API monetization."
          description="FainPi demonstrates paid API access for premium data, AI tools, file endpoints, and agentic applications."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {useCases.map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#262626] bg-[#0d0d0d] px-5 py-4 text-neutral-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}