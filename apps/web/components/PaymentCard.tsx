import type { PaymentStatus } from "@/types/payment";

type PaymentCardProps = {
  walletAddress: string;
  networkName: string;
  recipientAddress: string;
  amount: string;
  status: PaymentStatus;
  message: string;
  txHash: string;
  explorerUrl: string;
  onConnect: () => void;
  onPay: () => void;
};

export function PaymentCard({
  walletAddress,
  networkName,
  recipientAddress,
  amount,
  status,
  message,
  txHash,
  explorerUrl,
  onConnect,
  onPay,
}: PaymentCardProps) {
  const isPaying = status === "paying";
  const canPay = Boolean(walletAddress) && !isPaying;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <WalletInfo label="Wallet" value={walletAddress || "Not connected"} />
      <WalletInfo label="Freighter network" value={networkName || "Unknown"} />
      <WalletInfo label="Recipient" value={recipientAddress} />
      <WalletInfo label="Amount" value={`${amount} XLM`} />

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={onConnect}
          className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-cyan-400"
        >
          Connect Freighter
        </button>

        <button
          onClick={onPay}
          disabled={!canPay}
          className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPaying ? "Paying..." : `Pay ${amount} XLM`}
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">Status</p>
        <p className="mt-1 text-sm text-slate-100">{message}</p>
      </div>

      {txHash ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <p className="text-sm text-emerald-200">Transaction hash</p>
          <p className="mt-1 break-all font-mono text-sm text-emerald-100">
            {txHash}
          </p>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            View on Stellar Expert
          </a>
        </div>
      ) : null}
    </div>
  );
}

function WalletInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="break-all font-mono text-sm text-slate-100">{value}</p>
    </div>
  );
}