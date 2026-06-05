export type PaymentStatus =
  | "idle"
  | "checking"
  | "connected"
  | "paying"
  | "paid"
  | "error";

export type WalletConnection = {
  address: string;
  network: string;
};

export type PaymentResult = {
  hash: string;
};

export type NativeXlmPaymentParams = {
  sourceAddress: string;
  recipientAddress: string;
  amount: string;
};