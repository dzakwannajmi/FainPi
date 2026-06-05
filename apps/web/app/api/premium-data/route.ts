import {
  FAINPI_PAYMENT_HEADER,
  FAINPI_PAYMENT_HEADER_VALUE,
  PAYMENT_RECIPIENT,
} from "@/lib/constants";

export async function GET(request: Request) {
  const paymentHeader = request.headers.get(FAINPI_PAYMENT_HEADER);

  if (paymentHeader !== FAINPI_PAYMENT_HEADER_VALUE) {
    return Response.json(
      {
        error: "Payment Required",
        protocol: "Stellar payment demo",
        amount: "0.01",
        currency: "XLM",
        network: "stellar:testnet",
        recipient: PAYMENT_RECIPIENT,
        instruction:
          "Complete the Stellar Testnet payment, then retry this request with a valid demo receipt.",
        demoMode: true,
        demoHeader: `${FAINPI_PAYMENT_HEADER}: ${FAINPI_PAYMENT_HEADER_VALUE}`,
      },
      {
        status: 402,
      }
    );
  }

  return Response.json({
    message: "This is protected premium data.",
    access: "paid",
    price: "0.01 XLM",
    poweredBy: "Stellar Testnet + FainPi API Paywall",
    data: [
      {
        id: 1,
        title: "Premium campus dataset",
        value: "Example paid API payload from FainPi.",
      },
      {
        id: 2,
        title: "Developer API insight",
        value: "This response is unlocked after payment submission.",
      },
    ],
  });
}