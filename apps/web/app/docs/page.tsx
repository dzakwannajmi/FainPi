import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StepCard } from "@/components/StepCard";

const demoSteps = [
  {
    step: "1",
    title: "Open Generator",
    description:
      "Configure an endpoint path, price, currency, recipient address, and description. Copy the generated middleware snippet.",
  },
  {
    step: "2",
    title: "Open Demo",
    description:
      "Call the premium endpoint without payment and confirm that it returns HTTP 402 Payment Required.",
  },
  {
    step: "3",
    title: "Open Payment",
    description:
      "Connect Freighter, make sure the wallet is on Stellar Testnet, then send 0.01 XLM.",
  },
  {
    step: "4",
    title: "Unlock API",
    description:
      "After payment submission, the premium endpoint is unlocked using the current MVP demo receipt flow.",
  },
];

const contractFields = [
  "name: FainPi",
  "version: 0.2.0",
  "kind: Pay-per-request API paywall registry",
  "endpoint_path: /api/premium-data",
  "price: 0.01",
  "asset: XLM",
  "payment_network: stellar:testnet",
];

export default function DocsPage() {
  return (
    <div className="space-y-14">
      <SectionHeader
        eyebrow="Documentation"
        title="How to use FainPi"
        description="FainPi is a workshop MVP that demonstrates API paywall generation, Freighter-based Stellar Testnet payment, and Soroban paywall metadata registry."
      />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {demoSteps.map((item) => (
          <StepCard
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <InfoCard
          title="For developers"
          description="Use the Generator page to create a middleware snippet for a protected API endpoint. The generated code demonstrates how an endpoint can return 402 Payment Required before sending premium data."
          items={[
            "Set your endpoint path",
            "Set price per request",
            "Set payment asset",
            "Set recipient address",
            "Copy the generated Express snippet",
          ]}
        />

        <InfoCard
          title="For API consumers"
          description="Use the Payment page to connect Freighter and send a native XLM payment on Stellar Testnet before unlocking the premium API response."
          items={[
            "Install Freighter",
            "Switch to Stellar Testnet",
            "Use a funded testnet wallet",
            "Pay 0.01 XLM",
            "View the transaction hash",
          ]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          title="Current MVP"
          description="The current MVP demonstrates a real wallet payment transaction on Stellar Testnet, but the API unlock still uses a demo receipt header."
        />

        <InfoCard
          title="Next integration"
          description="The next phase is full Stellar MPP Charge verification, stronger payment receipt validation, and USDC/SAC-based settlement."
        />

        <InfoCard
          title="Production disclaimer"
          description="FainPi is not production-ready. It is an educational proof-of-concept for the Stellar Indonesia / WO UNISKA workshop."
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-white">
          Soroban Paywall Registry
        </h2>

        <p className="mt-4 leading-7 text-slate-300">
          FainPi includes a minimal Soroban contract that stores public API
          paywall metadata. It does not process payments, custody funds, verify
          receipts, or implement billing logic.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {contractFields.map((field) => (
            <div
              key={field}
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-300"
            >
              {field}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4">
          <p className="text-sm text-cyan-100">Testnet Contract ID</p>
          <p className="mt-2 break-all font-mono text-sm text-cyan-200">
            CA5D5QCSQGKTL65LEFEOFNKLFSBCTJPBHW34GBZ2CBMD6GUBM5BZBWDE
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
        <h2 className="text-xl font-semibold text-yellow-100">
          Safe project claim
        </h2>

        <p className="mt-3 leading-7 text-yellow-50/90">
          FainPi demonstrates a pay-per-request API monetization flow on
          Stellar. The MVP includes a protected API endpoint, Freighter-based
          Testnet payment, premium endpoint unlock, and a minimal Soroban
          paywall registry contract. Full Stellar MPP Charge verification is
          planned as the next phase.
        </p>
      </section>
    </div>
  );
}