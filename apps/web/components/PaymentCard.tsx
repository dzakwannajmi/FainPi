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
    <div className="soft-card space-y-4 rounded-3xl p-6">
      <WalletInfo label="Wallet" value={walletAddress || "Not connected"} />
      <WalletInfo label="Freighter network" value={networkName || "Unknown"} />
      <WalletInfo label="Recipient" value={recipientAddress} />
      <WalletInfo label="Amount" value={`${amount} XLM`} />

      <div className="flex flex-wrap gap-3 pt-2">
        <button onClick={onConnect} className="outline-button px-5 py-3">
          Connect Freighter
        </button>

        <button
          onClick={onPay}
          disabled={!canPay}
          className="primary-button px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPaying ? "Paying..." : `Pay ${amount} XLM`}
        </button>
      </div>

      <div className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-4">
        <p className="text-sm text-neutral-500">Status</p>
        <p className="mt-1 text-sm text-neutral-100">{message}</p>
      </div>

      {txHash ? (
        <div className="rounded-2xl border border-white/20 bg-white p-4 text-black">
          <p className="text-sm font-bold">Transaction hash</p>
          <p className="mt-1 break-all font-mono text-sm">{txHash}</p>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-bold underline underline-offset-4"
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
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="break-all font-mono text-sm text-neutral-100">{value}</p>
    </div>
  );
}