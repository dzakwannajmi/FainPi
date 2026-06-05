import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3002;
const PAYMENT_MODE = process.env.PAYMENT_MODE || "mock";
const STELLAR_NETWORK = process.env.STELLAR_NETWORK || "testnet";
const STELLAR_RECIPIENT =
  process.env.STELLAR_RECIPIENT || "G_REPLACE_WITH_YOUR_STELLAR_PUBLIC_KEY";

app.use(cors());
app.use(express.json());

function requireMockPayment(req, res, next) {
  const paymentHeader = req.header("x-fainpi-payment");

  if (PAYMENT_MODE !== "mock") {
    return res.status(501).json({
      error: "Real MPP payment mode is not implemented yet.",
      status: "integration_ready",
      nextStep: "Connect this middleware to Stellar MPP Charge."
    });
  }

  if (paymentHeader !== "paid") {
    return res.status(402).json({
      error: "Payment Required",
      protocol: "Stellar MPP Charge",
      amount: "0.01",
      currency: "USDC",
      network: `stellar:${STELLAR_NETWORK}`,
      recipient: STELLAR_RECIPIENT,
      instruction:
        "Send the required payment, then retry this request with a valid payment receipt.",
      demoMode: true,
      demoHeader: "x-fainpi-payment: paid"
    });
  }

  return next();
}

app.get("/", (req, res) => {
  return res.json({
    name: "FainPi Demo Server",
    description: "Pay-per-request API monetization powered by Stellar MPP.",
    status: "running"
  });
});

app.get("/api/free", (req, res) => {
  return res.json({
    message: "This is a free API response.",
    access: "public"
  });
});

app.get("/api/premium-data", requireMockPayment, (req, res) => {
  return res.json({
    message: "This is protected premium data.",
    access: "paid",
    price: "0.01 USDC",
    poweredBy: "Stellar MPP",
    data: [
      {
        id: 1,
        title: "Premium campus dataset",
        value: "Example paid API payload from FainPi."
      },
      {
        id: 2,
        title: "Developer API insight",
        value: "This response is unlocked after payment."
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`FainPi demo server is running on http://localhost:${PORT}`);
});