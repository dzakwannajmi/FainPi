import {
  getAddress,
  getNetwork,
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import {
  Asset,
  BASE_FEE,
  Networks,
  Operation,
  rpc as StellarRpc,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import { STELLAR_EXPERT_TESTNET_TX_URL } from "@/lib/constants";
import type {
  NativeXlmPaymentParams,
  PaymentResult,
  WalletConnection,
} from "@/types/payment";

const SOROBAN_TESTNET_RPC_URL = "https://soroban-testnet.stellar.org";
const FREIGHTER_TESTNET_NAME = "TESTNET";

export async function checkFreighterConnection(): Promise<WalletConnection | null> {
  const connectedResult = await isConnected();

  if (connectedResult.error) {
    throw new Error(getFreighterErrorMessage(connectedResult.error));
  }

  if (!connectedResult.isConnected) {
    return null;
  }

  const addressResult = await getAddress();

  if (addressResult.error) {
    throw new Error(getFreighterErrorMessage(addressResult.error));
  }

  if (!addressResult.address) {
    return null;
  }

  const networkResult = await getNetwork();

  if (networkResult.error) {
    throw new Error(getFreighterErrorMessage(networkResult.error));
  }

  return {
    address: addressResult.address,
    network: networkResult.network,
  };
}

export async function connectFreighterWallet(): Promise<WalletConnection> {
  const accessResult = await requestAccess();

  if (accessResult.error) {
    throw new Error(getFreighterErrorMessage(accessResult.error));
  }

  if (!accessResult.address) {
    throw new Error("Freighter did not return a wallet address.");
  }

  const networkResult = await getNetwork();

  if (networkResult.error) {
    throw new Error(getFreighterErrorMessage(networkResult.error));
  }

  return {
    address: accessResult.address,
    network: networkResult.network,
  };
}

export async function sendNativeXlmTestnetPayment({
  sourceAddress,
  recipientAddress,
  amount,
}: NativeXlmPaymentParams): Promise<PaymentResult> {
  const networkResult = await getNetwork();

  if (networkResult.error) {
    throw new Error(getFreighterErrorMessage(networkResult.error));
  }

  if (networkResult.network !== FREIGHTER_TESTNET_NAME) {
    throw new Error("Please switch Freighter network to TESTNET.");
  }

  const server = new StellarRpc.Server(SOROBAN_TESTNET_RPC_URL);
  const sourceAccount = await server.getAccount(sourceAddress);

  // Native XLM is used for the MVP because it is simpler for workshop testing.
  // Full MPP Charge verification remains the next integration phase.
  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: recipientAddress,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build();

  const signedResult = await signTransaction(transaction.toXDR(), {
    networkPassphrase: Networks.TESTNET,
    address: sourceAddress,
  });

  if (signedResult.error) {
    throw new Error(getFreighterErrorMessage(signedResult.error));
  }

  const signedTransaction = TransactionBuilder.fromXDR(
    signedResult.signedTxXdr,
    Networks.TESTNET
  );

  const submitResult = await server.sendTransaction(signedTransaction);

  if (submitResult.status === "ERROR") {
    throw new Error("Transaction submission failed.");
  }

  return {
    hash: submitResult.hash,
  };
}

export function createTestnetTransactionUrl(hash: string) {
  return `${STELLAR_EXPERT_TESTNET_TX_URL}/${hash}`;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function getFreighterErrorMessage(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Freighter returned an unknown error.";
}