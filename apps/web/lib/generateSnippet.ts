type GenerateExpressSnippetOptions = {
  endpointPath: string;
  amount: string;
  currency: string;
  recipient: string;
  description: string;
};

export function generateExpressSnippet({
  endpointPath,
  amount,
  currency,
  recipient,
  description,
}: GenerateExpressSnippetOptions) {
  const normalizedEndpointPath = normalizeEndpointPath(endpointPath);
  const normalizedAmount = amount.trim() || "0.01";
  const normalizedCurrency = currency.trim() || "XLM";
  const normalizedRecipient =
    recipient.trim() || "REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY";
  const normalizedDescription = description.trim() || "Premium API access";

  return `import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3002;
const STELLAR_RECIPIENT =
  process.env.STELLAR_RECIPIENT || ${toCodeString(normalizedRecipient)};

app.use(express.json());

/**
 * FainPi MVP note:
 * This middleware demonstrates the HTTP 402 payment flow using a demo receipt
 * header. Replace this demo header with full Stellar MPP Charge or on-chain
 * payment verification before using it in production.
 */
function requireDemoPayment(req, res, next) {
  const paymentReceipt = req.header("x-fainpi-payment");

  if (paymentReceipt !== "paid") {
    return res.status(402).json({
      error: "Payment Required",
      protocol: "FainPi demo receipt",
      verificationMode: "demo-header",
      amount: ${toCodeString(normalizedAmount)},
      currency: ${toCodeString(normalizedCurrency)},
      recipient: STELLAR_RECIPIENT,
      description: ${toCodeString(normalizedDescription)},
      nextStep:
        "Replace this demo receipt with full Stellar MPP Charge verification.",
    });
  }

  next();
}

app.get(${toCodeString(normalizedEndpointPath)}, requireDemoPayment, (_req, res) => {
  return res.json({
    message: "Premium API unlocked.",
    access: "paid",
    poweredBy: "FainPi API Paywall",
    data: [
      {
        id: 1,
        title: ${toCodeString(normalizedDescription)},
        value: "Example paid API payload.",
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(\`FainPi protected API running on port \${PORT}\`);
});
`;
}

function normalizeEndpointPath(endpointPath: string) {
  const trimmedEndpointPath = endpointPath.trim();

  if (!trimmedEndpointPath) {
    return "/api/premium-data";
  }

  return trimmedEndpointPath.startsWith("/")
    ? trimmedEndpointPath
    : `/${trimmedEndpointPath}`;
}

function toCodeString(value: string) {
  return JSON.stringify(value);
}
