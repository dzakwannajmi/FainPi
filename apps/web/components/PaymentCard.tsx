import type { PaymentStatus } from "@/types/payment";

type PaymentCardProps = {
  walletAddress: string;
  networkName: string;
  recipientAddress: string;
  onRecipientAddressChange: (recipientAddress: string) => void;
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
  onRecipientAddressChange,
  amount,
  status,
  message,
  txHash,
  explorerUrl,
  onConnect,
  onPay,
}: PaymentCardProps) {
  const isPaying = status === "paying";
  const canPay = Boolean(walletAddress) && Boolean(recipientAddress.trim()) && !isPaying;

  return (
    <div className="liquid-glass-strong space-y-5 rounded-[2rem] p-6">
      <div className="grid gap-4">
        <WalletInfo label="Wallet" value={walletAddress || "Not connected"} />
        <WalletInfo label="Freighter network" value={networkName || "Unknown"} />

        <div>
          <p className="text-xs font-medium text-white/40">Recipient</p>
          <input
            value={recipientAddress}
            onChange={(event) => onRecipientAddressChange(event.target.value)}
            disabled={isPaying}
            placeholder="Enter Stellar recipient public key"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-white outline-none transition placeholder:text-white/25 focus:border-white/35 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="mt-2 text-xs leading-5 text-white/35">
            This is the wallet address that will receive the XLM Testnet payment.
          </p>
        </div>

        <WalletInfo label="Amount" value={`${amount} XLM`} />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={onConnect}
          className="liquid-glass rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Connect Freighter
        </button>

        <button
          onClick={onPay}
          disabled={!canPay}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPaying ? "Paying..." : `Pay ${amount} XLM`}
        </button>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/60 p-4">
        <p className="text-xs font-medium text-white/40">Status</p>
        <p className="mt-1 text-sm text-white">{message}</p>
      </div>

      {txHash ? (
        <div className="rounded-[1.5rem] bg-white p-4 text-black">
          <p className="text-sm font-semibold">Transaction hash</p>

          <p className="mt-2 break-all font-mono text-sm">{txHash}</p>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold underline underline-offset-4"
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
      <p className="text-xs font-medium text-white/40">{label}</p>
      <p className="mt-1 break-all font-mono text-sm text-white/90">{value}</p>
    </div>
  );
}
