"use client";

import { useEffect, useMemo, useState } from "react";
import { ApiResponsePanel } from "@/components/ApiResponsePanel";
import { PaymentCard } from "@/components/PaymentCard";
import { PAYMENT_AMOUNT, PAYMENT_RECIPIENT } from "@/lib/constants";
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

export default function PaymentPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [message, setMessage] = useState("Connect Freighter to start.");
  const [txHash, setTxHash] = useState("");
  const [apiResult, setApiResult] = useState<ApiResult>(
    createEmptyApiResult("No premium API request yet.")
  );

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
        setMessage("Freighter is not connected yet.");
        return;
      }

      setWalletAddress(walletConnection.address);
      setNetworkName(walletConnection.network);
      setStatus("connected");
      setMessage("Freighter wallet connected.");
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
      setMessage("Freighter wallet connected.");
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
      setMessage("Building Stellar Testnet payment transaction...");

      const paymentResult = await sendNativeXlmTestnetPayment({
        sourceAddress: walletAddress,
        recipientAddress: PAYMENT_RECIPIENT,
        amount: PAYMENT_AMOUNT,
      });

      setTxHash(paymentResult.hash);
      setStatus("paid");
      setMessage("Payment submitted successfully. Premium API unlocked.");

      await unlockPremiumEndpoint();
    } catch (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  }

  async function unlockPremiumEndpoint() {
    const result = await callDemoEndpoint("/api/premium-data", {
      paid: true,
    });

    setApiResult(result);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            Payment
          </p>

          <h1 className="font-body text-4xl font-medium leading-none tracking-[-0.06em] text-white md:text-5xl">
            Pay with Freighter on{" "}
            <span className="font-accent italic font-normal">
              Stellar Testnet.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-8 text-white/55 md:text-base">
            This page demonstrates a wallet-based payment step for FainPi using
            native XLM on Stellar Testnet. After the payment is submitted, the
            premium API endpoint is unlocked using the current demo receipt
            flow.
          </p>
        </div>

        <PaymentCard
          walletAddress={walletAddress}
          networkName={networkName}
          recipientAddress={PAYMENT_RECIPIENT}
          amount={PAYMENT_AMOUNT}
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
            This payment page sends a real native XLM transaction on Stellar
            Testnet, but the API unlock still uses the current demo receipt
            header. Full MPP Charge verification remains the next integration
            phase.
          </p>
        </div>
      </section>

      <ApiResponsePanel
        title="Premium API response"
        result={apiResult}
        minHeightClassName="min-h-[460px]"
      />
    </div>
  );
}