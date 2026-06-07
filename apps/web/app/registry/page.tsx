import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { SectionHeader } from "@/components/SectionHeader";

const MAINNET_CONTRACT_ID =
  "CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R";

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
    value: "stellar:mainnet",
  },
  {
    label: "Status",
    value: "Workshop MVP - not production ready",
  },
];

const deploymentDetails = [
  {
    label: "WASM hash",
    value: "d891b45262573dde0a206e4bd849f600c6abcb7ebec7ecaf55e3110d379009bb",
  },
  {
    label: "WASM upload transaction",
    value: "0e95ff576594a212cc493d9a48fdcf11a8a5acac40651f4c55ebebe1f0416c2c",
  },
  {
    label: "Deploy transaction",
    value: "e5e1003726a0844e085e464418028b002b4c1c757655cc15d44376b7bc17692d",
  },
  {
    label: "Init transaction",
    value: "748a9fffcaa7282d8d3e5bdc68641b9559999401bd3446bfc6308371bb176fd9",
  },
];

const contractLinks = [
  {
    label: "View contract on Stellar Lab",
    href: `https://lab.stellar.org/r/mainnet/contract/${MAINNET_CONTRACT_ID}`,
  },
  {
    label: "View deploy transaction",
    href: "https://stellar.expert/explorer/public/tx/e5e1003726a0844e085e464418028b002b4c1c757655cc15d44376b7bc17692d",
  },
  {
    label: "View init transaction",
    href: "https://stellar.expert/explorer/public/tx/748a9fffcaa7282d8d3e5bdc68641b9559999401bd3446bfc6308371bb176fd9",
  },
];

export default function RegistryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Registry"
            title="On-chain API paywall metadata."
            description="FainPi uses a minimal Soroban contract deployed on Stellar Mainnet to store public metadata for the protected API endpoint, including endpoint path, price, asset, payment network, and recipient address."
          />

          <div className="liquid-glass rounded-[2rem] p-5">
            <h2 className="text-sm font-semibold text-white">
              Why this contract exists
            </h2>

            <p className="mt-2 text-sm leading-7 text-white/55">
              The registry contract does not process payments. It acts as a
              public mainnet deployment artifact that describes the API paywall
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
                className="liquid-glass rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="liquid-glass-strong rounded-[2rem] p-6">
          <h2 className="font-body text-3xl font-medium tracking-[-0.05em] text-white">
            Mainnet Contract ID
          </h2>

          <p className="mt-4 break-all rounded-[1.5rem] bg-white p-4 font-mono text-sm font-bold text-black">
            {MAINNET_CONTRACT_ID}
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
          description="The registry makes the paywall configuration visible on Stellar Mainnet while keeping the actual API unlock flow in the application layer."
        />
      </section>

      <section className="liquid-glass rounded-[2rem] p-6">
        <h2 className="font-body text-3xl font-medium tracking-[-0.05em] text-white">
          Deployment Details
        </h2>

        <div className="mt-6 grid gap-3">
          {deploymentDetails.map((item) => (
            <RegistryField
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </section>

      <section className="liquid-glass rounded-[2rem] p-6">
        <h2 className="font-body text-3xl font-medium tracking-[-0.05em] text-white">
          Safe claim
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
          FainPi demonstrates a pay-per-request API monetization flow on
          Stellar. The MVP includes a protected API endpoint, Freighter-based
          Testnet payment, premium endpoint unlock, and a minimal Soroban
          Paywall Registry contract deployed on Stellar Mainnet. Full Stellar
          MPP Charge verification is planned as the next phase.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/payment"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
          >
            Try Payment Flow
          </Link>

          <Link
            href="/docs"
            className="liquid-glass rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Read Docs
          </Link>
        </div>
      </section>
    </div>
  );
}

function RegistryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>

      <p className="mt-2 break-all font-mono text-sm text-white/85">{value}</p>
    </div>
  );
}
