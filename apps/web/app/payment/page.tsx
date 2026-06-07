"use client";

import { useEffect, useMemo, useState } from "react";
import { ApiResponsePanel } from "@/components/ApiResponsePanel";
import { PaymentCard } from "@/components/PaymentCard";
import { PAYMENT_RECIPIENT } from "@/lib/constants";
import { callDemoEndpoint, createEmptyApiResult } from "@/lib/apiClient";
import {
  checkFreighterConnection,
  connectFreighterWallet,
  createTestnetTransactionUrl,
  getErrorMessage,
  sendNativeXlmTestnetPayment,
} from "@/lib/stellarPayment";
import type { ApiResult } from "@/types/api";
import type { PaymentStatus } from "@/types/payment";

type PremiumApiItem = {
  id: string;
  title: string;
  category: string;
  endpointPath: string;
  price: string;
  asset: string;
  description: string;
  includes: string[];
};

const premiumApiItems: PremiumApiItem[] = [
  {
    id: "campus-dataset",
    title: "Premium Campus Dataset",
    category: "Dataset API",
    endpointPath: "/api/premium-data",
    price: "0.01",
    asset: "XLM",
    description:
      "Access a sample premium dataset response that represents paid structured data for education, research, or internal tools.",
    includes: [
      "Structured premium API payload",
      "Example campus dataset item",
      "Protected endpoint access",
    ],
  },
  {
    id: "ai-summary",
    title: "AI Summary Endpoint",
    category: "AI API",
    endpointPath: "/api/premium-data",
    price: "0.01",
    asset: "XLM",
    description:
      "Simulate a paid AI endpoint where users pay per request before receiving an AI-generated premium response.",
    includes: [
      "Pay-per-request AI endpoint concept",
      "Premium response unlock flow",
      "Agentic API payment use case",
    ],
  },
  {
    id: "developer-insight",
    title: "Developer API Insight",
    category: "Developer Tool",
    endpointPath: "/api/premium-data",
    price: "0.01",
    asset: "XLM",
    description:
      "Demonstrate how developer tools, analytics, or premium API insights can be monetized request by request.",
    includes: [
      "Developer-focused API monetization",
      "HTTP 402 Payment Required flow",
      "Demo receipt-based unlock",
    ],
  },
  {
    id: "file-access",
    title: "Protected File Access",
    category: "File API",
    endpointPath: "/api/premium-data",
    price: "0.01",
    asset: "XLM",
    description:
      "Represent a paid file download or premium content endpoint protected by a Stellar payment flow.",
    includes: [
      "Paid file access concept",
      "Protected content API flow",
      "Premium endpoint unlock demo",
    ],
  },
];

export default function PaymentPage() {
  const [selectedItemId, setSelectedItemId] = useState(premiumApiItems[0].id);
  const [walletAddress, setWalletAddress] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [message, setMessage] = useState("Choose a premium API item and connect Freighter.");
  const [txHash, setTxHash] = useState("");
  const [apiResult, setApiResult] = useState<ApiResult>(
    createEmptyApiResult("No premium API request yet.")
  );

  const selectedItem = useMemo(() => {
    return (
      premiumApiItems.find((item) => item.id === selectedItemId) ??
      premiumApiItems[0]
    );
  }, [selectedItemId]);

  const explorerUrl = useMemo(() => {
    if (!txHash) {
      return "";
    }

    return createTestnetTransactionUrl(txHash);
  }, [txHash]);

  useEffect(() => {
    void restoreWalletConnection();
  }, []);

  async function restoreWalletConnection() {
    try {
      setStatus("checking");

      const walletConnection = await checkFreighterConnection();

      if (!walletConnection) {
        setStatus("idle");
        setMessage("Choose a premium API item and connect Freighter.");
        return;
      }

      setWalletAddress(walletConnection.address);
      setNetworkName(walletConnection.network);
      setStatus("connected");
      setMessage("Freighter wallet connected. You can now pay for the selected API item.");
    } catch (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  }

  async function handleConnectWallet() {
    try {
      setStatus("checking");
      setMessage("Waiting for Freighter approval...");

      const walletConnection = await connectFreighterWallet();

      setWalletAddress(walletConnection.address);
      setNetworkName(walletConnection.network);
      setStatus("connected");
      setMessage("Freighter wallet connected. You can now pay for the selected API item.");
    } catch (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  }

  async function handlePayWithXlm() {
    try {
      if (!walletAddress) {
        throw new Error("Connect Freighter before sending payment.");
      }

      setStatus("paying");
      setTxHash("");
      setApiResult(createEmptyApiResult("Waiting for payment confirmation..."));
      setMessage(`Building payment transaction for ${selectedItem.title}...`);

      const paymentResult = await sendNativeXlmTestnetPayment({
        sourceAddress: walletAddress,
        recipientAddress: PAYMENT_RECIPIENT,
        amount: selectedItem.price,
      });

      setTxHash(paymentResult.hash);
      setStatus("paid");
      setMessage(`${selectedItem.title} unlocked successfully.`);

      await unlockPremiumEndpoint(selectedItem);
    } catch (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  }

  async function unlockPremiumEndpoint(item: PremiumApiItem) {
    const result = await callDemoEndpoint(item.endpointPath, {
      paid: true,
    });

    setApiResult({
      status: result.status,
      body: {
        selectedItem: {
          title: item.title,
          category: item.category,
          endpointPath: item.endpointPath,
          price: `${item.price} ${item.asset}`,
        },
        unlockStatus: "Premium API unlocked after payment submission.",
        paymentMode: "Stellar Testnet payment demo",
        note: "The current MVP uses a demo receipt header after payment. Full Stellar MPP Charge verification is planned as the next phase.",
        premiumResponse: result.body,
      },
    });
  }

  function handleSelectItem(itemId: string) {
    setSelectedItemId(itemId);
    setTxHash("");
    setStatus(walletAddress ? "connected" : "idle");
    setMessage(
      walletAddress
        ? "Premium API item selected. You can now pay with Freighter."
        : "Premium API item selected. Connect Freighter to continue."
    );
    setApiResult(createEmptyApiResult("No premium API request yet."));
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-7">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            Payment
          </p>

          <h1 className="font-body text-4xl font-medium leading-none tracking-[-0.06em] text-white md:text-5xl">
            Choose a premium API and{" "}
            <span className="font-accent italic font-normal">
              pay with Stellar.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-8 text-white/55 md:text-base">
            Select a premium API item, pay with Freighter on Stellar Testnet,
            and unlock the protected API response. This makes the payment flow
            clearer than a single generic payment button.
          </p>
        </div>

        <section className="space-y-4">
          <div>
            <h2 className="font-body text-2xl font-medium tracking-[-0.04em] text-white">
              Premium API catalog
            </h2>

            <p className="mt-2 text-sm leading-7 text-white/50">
              These are example API products that can be monetized with a
              pay-per-request flow.
            </p>
          </div>

          <div className="grid gap-3">
            {premiumApiItems.map((item) => (
              <PremiumApiCard
                key={item.id}
                item={item}
                isSelected={item.id === selectedItem.id}
                onSelect={() => handleSelectItem(item.id)}
              />
            ))}
          </div>
        </section>

        <SelectedApiSummary item={selectedItem} />

        <PaymentCard
          walletAddress={walletAddress}
          networkName={networkName}
          recipientAddress={PAYMENT_RECIPIENT}
          amount={selectedItem.price}
          status={status}
          message={message}
          txHash={txHash}
          explorerUrl={explorerUrl}
          onConnect={handleConnectWallet}
          onPay={handlePayWithXlm}
        />

        <div className="liquid-glass rounded-[2rem] p-5">
          <h2 className="text-sm font-semibold text-white">MVP note</h2>

          <p className="mt-2 text-sm leading-7 text-white/55">
            The live payment demo uses Stellar Testnet for safety. The mainnet
            Soroban contract stores public paywall metadata only. Full Stellar
            MPP Charge verification is planned as the next integration phase.
          </p>
        </div>
      </section>

      <div className="min-w-0 max-w-full">
        <ApiResponsePanel
          title="Unlocked API response"
          result={apiResult}
          minHeightClassName="h-[520px]"
        />
      </div>
    </div>
  );
}

function PremiumApiCard({
  item,
  isSelected,
  onSelect,
}: {
  item: PremiumApiItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[2rem] p-5 text-left transition ${
        isSelected
          ? "bg-white text-black"
          : "liquid-glass text-white hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              isSelected ? "text-black/55" : "text-white/40"
            }`}
          >
            {item.category}
          </p>

          <h3 className="mt-2 font-body text-xl font-medium tracking-[-0.04em]">
            {item.title}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isSelected
              ? "bg-black text-white"
              : "border border-white/15 text-white/70"
          }`}
        >
          {item.price} {item.asset}
        </span>
      </div>

      <p
        className={`mt-4 text-sm leading-7 ${
          isSelected ? "text-black/65" : "text-white/55"
        }`}
      >
        {item.description}
      </p>
    </button>
  );
}

function SelectedApiSummary({ item }: { item: PremiumApiItem }) {
  return (
    <section className="liquid-glass-strong rounded-[2rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
        Selected API item
      </p>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-body text-2xl font-medium tracking-[-0.04em] text-white">
            {item.title}
          </h2>

          <p className="mt-2 text-sm leading-7 text-white/55">
            {item.description}
          </p>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
          {item.price} {item.asset}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <SummaryField label="Endpoint" value={item.endpointPath} />
        <SummaryField label="Payment network" value="stellar:testnet" />
        <SummaryField label="Mainnet registry" value="stellar:mainnet" />
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
          Includes
        </p>

        <ul className="mt-3 space-y-2">
          {item.includes.map((includedItem) => (
            <li
              key={includedItem}
              className="flex gap-3 text-sm leading-6 text-white/60"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
              <span>{includedItem}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 break-all font-mono text-sm text-white/85">{value}</p>
    </div>
  );
}
