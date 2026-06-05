export const DEMO_API_URL = process.env.NEXT_PUBLIC_DEMO_API_URL || "";

export const PAYMENT_RECIPIENT =
  process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT ||
  "G_REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY";

export const PAYMENT_AMOUNT = process.env.NEXT_PUBLIC_PAYMENT_AMOUNT || "0.01";

export const FAINPI_PAYMENT_HEADER = "x-fainpi-payment";

export const FAINPI_PAYMENT_HEADER_VALUE = "paid";

export const STELLAR_EXPERT_TESTNET_TX_URL =
  "https://stellar.expert/explorer/testnet/tx";