export type SnippetConfig = {
  endpointPath: string;
  amount: string;
  currency: string;
  recipient: string;
  description: string;
};

export function generateExpressSnippet(config: SnippetConfig) {
  const endpointPath = normalizeEndpointPath(config.endpointPath);
  const amount = config.amount || "0.01";
  const currency = config.currency || "USDC";
  const recipient = config.recipient || "G_REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY";
  const description = config.description || "Premium API access";

  return `import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3002;
const STELLAR_RECIPIENT =
  process.env.STELLAR_RECIPIENT || "${recipient}";

app.use(express.json());

function requirePayment(req, res, next) {
  const paymentHeader = req.header("x-fainpi-payment");

  if (paymentHeader !== "paid") {
    return res.status(402).json({
      error: "Payment Required",
      protocol: "Stellar MPP Charge",
      amount: "${amount}",
      currency: "${currency}",
      recipient: STELLAR_RECIPIENT,
      description: "${description}",
      nextStep:
        "Connect this middleware to Stellar MPP Charge for real settlement."
    });
  }

  return next();
}

app.get("${endpointPath}", requirePayment, (req, res) => {
  return res.json({
    message: "This response is protected by FainPi.",
    access: "paid",
    price: "${amount} ${currency}"
  });
});

app.listen(PORT, () => {
  console.log(\`Protected API server is running on http://localhost:\${PORT}\`);
});
`;
}

function normalizeEndpointPath(value: string) {
  if (!value.trim()) {
    return "/api/premium-data";
  }

  return value.startsWith("/") ? value : `/${value}`;
}