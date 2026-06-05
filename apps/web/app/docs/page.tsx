const sections = [
  {
    title: "What is FainPi?",
    content:
      "FainPi is a lightweight API paywall generator for pay-per-request API monetization powered by Stellar MPP.",
  },
  {
    title: "Why MPP Charge?",
    content:
      "MPP Charge is suitable for immediate one-time API payments. It keeps the MVP simple because each protected request can be treated as an individual paid access attempt.",
  },
  {
    title: "Current MVP status",
    content:
      "The current version uses a mock payment header to demonstrate the HTTP 402 paywall flow. Real Stellar MPP Charge settlement is planned for the next integration phase.",
  },
  {
    title: "Production disclaimer",
    content:
      "FainPi is an educational workshop MVP. It is not production-ready and should not be used as a real billing system without further security, validation, and payment settlement work.",
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Documentation
        </p>
        <h1 className="text-4xl font-bold text-white">FainPi Docs</h1>
        <p className="mt-4 leading-7 text-slate-300">
          Learn how the FainPi MVP demonstrates a pay-per-request API flow and
          how it can be extended with Stellar MPP Charge.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h2 className="mb-3 text-xl font-semibold text-white">
              {section.title}
            </h2>
            <p className="leading-7 text-slate-300">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}