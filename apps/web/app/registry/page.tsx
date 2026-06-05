import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";

const registryMetadata = [
  {
    label: "Project",
    value: "FainPi",
  },
  {
    label: "Version",
    value: "0.2.0",
  },
  {
    label: "Registry type",
    value: "Pay-per-request API paywall registry",
  },
  {
    label: "Endpoint path",
    value: "/api/premium-data",
  },
  {
    label: "Price",
    value: "0.01",
  },
  {
    label: "Asset",
    value: "XLM",
  },
  {
    label: "Payment network",
    value: "stellar:testnet",
  },
  {
    label: "Status",
    value: "Workshop MVP - not production ready",
  },
];

const contractLinks = [
  {
    label: "View contract on Stellar Lab",
    href: "https://lab.stellar.org/r/testnet/contract/CA5D5QCSQGKTL65LEFEOFNKLFSBCTJPBHW34GBZ2CBMD6GUBM5BZBWDE",
  },
  {
    label: "View deploy transaction",
    href: "https://stellar.expert/explorer/testnet/tx/a9530525e87687f583ab491481a629dceb152fe1e34f36d9d717d613dd2dd82f",
  },
  {
    label: "View init transaction",
    href: "https://stellar.expert/explorer/testnet/tx/1a6c70a5fd97f31195b4ec3a73dd2686e2a30051de55b24b7be94cdabf02a418",
  },
];

export default function RegistryPage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Registry"
            title="On-chain API paywall metadata."
            description="FainPi uses a minimal Soroban contract to store public metadata for the protected API endpoint, including endpoint path, price, asset, payment network, and recipient address."
          />

          <div className="rounded-3xl border border-white/15 bg-[#111111] p-5">
            <h2 className="font-bold text-white">Why this contract exists</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-400">
              The registry contract does not process payments. It acts as a
              public deployment artifact that describes the API paywall
              configuration used by the FainPi MVP.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {contractLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="outline-button px-5 py-3 text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="soft-card rounded-3xl p-6">
          <h2 className="section-title text-white">Testnet Contract ID</h2>

          <p className="mt-4 break-all rounded-2xl border border-white/15 bg-white p-4 font-mono text-sm font-bold text-black">
            CA5D5QCSQGKTL65LEFEOFNKLFSBCTJPBHW34GBZ2CBMD6GUBM5BZBWDE
          </p>

          <div className="mt-6 grid gap-3">
            {registryMetadata.map((item) => (
              <RegistryField
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          title="What it stores"
          description="The contract stores public API paywall configuration such as endpoint path, payment amount, payment asset, payment network, owner address, and recipient address."
        />

        <InfoCard
          title="What it does not do"
          description="The contract does not custody funds, process API payments, verify receipts, act as escrow, or implement production billing logic."
        />

        <InfoCard
          title="Why it matters"
          description="The registry makes the paywall configuration visible on Stellar while keeping the actual API unlock flow in the application layer."
        />
      </section>

      <section className="rounded-3xl border border-white/15 bg-[#111111] p-6">
        <h2 className="section-title text-white">Safe claim</h2>

        <p className="mt-3 max-w-3xl leading-7 text-neutral-400">
          FainPi uses a minimal Soroban Paywall Registry contract as an
          on-chain metadata artifact. The current MVP demonstrates a Stellar
          Testnet payment and API unlock flow. Full Stellar MPP Charge
          verification is planned as the next phase.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/payment" className="primary-button px-5 py-3">
            Try Payment Flow
          </Link>

          <Link href="/docs" className="outline-button px-5 py-3">
            Read Docs
          </Link>
        </div>
      </section>
    </div>
  );
}

function RegistryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#262626] bg-[#050505] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 break-all font-mono text-sm text-neutral-200">
        {value}
      </p>
    </div>
  );
}