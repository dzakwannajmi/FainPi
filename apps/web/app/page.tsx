import Link from "next/link";

const features = [
  {
    title: "Pay-per-request",
    description:
      "Protect API endpoints and require a small payment before returning premium data.",
  },
  {
    title: "Built for Stellar MPP",
    description:
      "Designed around Stellar MPP Charge for simple one-time API payments.",
  },
  {
    title: "Developer-first",
    description:
      "Generate Express middleware snippets that developers can copy into their own API server.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            Stellar MPP API Paywall Generator
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-6xl">
              Turn any API endpoint into a paid API.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              FainPi helps developers monetize API requests using a lightweight
              pay-per-request flow powered by Stellar MPP.
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
              href="/demo"
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Try Demo
            </Link>
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
  "protocol": "Stellar MPP Charge",
  "amount": "0.01",
  "currency": "USDC"
}`}</code>
          </pre>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h2 className="mb-3 text-xl font-semibold text-white">
              {feature.title}
            </h2>
            <p className="leading-7 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}