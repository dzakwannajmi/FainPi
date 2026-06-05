# FainPi

FainPi is a lightweight API paywall generator for pay-per-request API monetization powered by Stellar.

It helps developers protect API endpoints with a payment-required flow, generate Express middleware snippets, and demonstrate how premium API access can be unlocked after a Stellar-based payment.

> Built for Stellar Indonesia / WO UNISKA as an educational workshop MVP.

---

## Live Demo

```txt
https://fainpi.vercel.app
```

---

## Overview

FainPi demonstrates a simple idea:

> Turn any API endpoint into a paid endpoint.

A developer can configure an endpoint path, price, currency, Stellar recipient address, and description. FainPi then generates a middleware snippet and provides a demo flow where premium API access requires payment before the protected response is returned.

The MVP includes:

- API paywall demo with `402 Payment Required`
- Express middleware generator
- Internal Next.js API routes
- Freighter wallet payment page
- Native XLM payment on Stellar Testnet
- Premium API unlock after payment submission
- Minimal Soroban paywall registry contract as deployment artifact

---

## Problem Statement

Small developers, students, and indie builders often have useful APIs, datasets, AI tools, or premium endpoints, but monetizing them per request is usually too complex.

Traditional API monetization often requires:

- Subscription billing
- Payment gateway integration
- API key billing system
- Manual payment verification
- External payment processor
- More infrastructure than a small developer needs

FainPi simplifies the concept into:

> One API request = one small payment.

---

## Solution

FainPi provides a lightweight API paywall flow:

```txt
User requests premium API
        ↓
API returns 402 Payment Required
        ↓
User pays through Stellar
        ↓
Payment is submitted
        ↓
Premium API response is unlocked
```

For the current MVP, FainPi demonstrates this flow using:

- HTTP `402 Payment Required`
- Freighter wallet connection
- Native XLM payment on Stellar Testnet
- Demo receipt header for API unlock
- Soroban paywall registry contract for public API paywall metadata

The next integration phase is full Stellar MPP Charge verification for production-grade pay-per-request settlement.

---

## Why Stellar?

Stellar is suitable for pay-per-request API monetization because it supports fast and low-cost payments, making it practical for small API access payments and machine-to-machine payment flows.

FainPi is designed around the direction of Stellar MPP and agentic/API payments, where APIs and applications can request payment before returning premium responses.

---

## MVP Status

This project is an educational workshop MVP.

It is not production-ready.

### Implemented

- Landing page
- Generator page
- Demo page
- Payment page
- Documentation page
- Internal Next.js API routes
- Protected endpoint with `402 Payment Required`
- Mock receipt-based API unlock
- Freighter wallet connection
- Native XLM payment on Stellar Testnet
- Transaction hash display
- Stellar Expert testnet transaction link
- Minimal Soroban paywall registry contract
- Final Stellar Testnet contract deployment

### Current Payment Mode

The current MVP uses a real native XLM transaction on Stellar Testnet through Freighter.

However, the protected API unlock still uses a demo receipt header:

```txt
x-fainpi-payment: paid
```

This means the current MVP demonstrates the end-to-end product flow, but it does not yet perform production-grade on-chain payment verification before unlocking API access.

### Planned Payment Mode

The next phase is full Stellar MPP Charge integration.

Planned improvements:

- Real MPP Charge payment request
- Real payment verification
- Stronger receipt validation
- USDC/SAC-based settlement
- Improved middleware for production API usage

---

## Core Features

### 1. API Paywall Demo

FainPi includes protected API routes:

```txt
GET /api/free
GET /api/premium-data
```

The premium endpoint returns `402 Payment Required` when accessed without payment.

### 2. Middleware Generator

The generator page allows developers to configure:

- Endpoint path
- Price per request
- Currency
- Stellar recipient address
- Endpoint description

It then generates an Express middleware snippet that demonstrates how an API endpoint can be protected with a payment-required flow.

### 3. Freighter Payment Page

The payment page allows users to:

- Connect Freighter
- Confirm Stellar Testnet network
- Send native XLM payment
- View transaction hash
- Open the transaction on Stellar Expert
- Unlock the premium API response after payment submission

### 4. Soroban Paywall Registry Contract

FainPi includes a minimal Soroban smart contract that stores public API paywall metadata.

The contract is only a registry artifact. It does not process payments or hold funds.

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS
- Freighter API
- Stellar SDK

### API Layer

- Next.js API Routes
- HTTP `402 Payment Required`
- Demo receipt header

### Optional Local Backend Demo

- Node.js
- Express
- CORS
- Dotenv

### Smart Contract

- Rust
- Soroban SDK
- Stellar CLI
- Stellar Testnet

---

## Project Structure

```txt
fainpi/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── generator/
│   │   │   │   └── page.tsx
│   │   │   ├── demo/
│   │   │   │   └── page.tsx
│   │   │   ├── payment/
│   │   │   │   └── page.tsx
│   │   │   ├── docs/
│   │   │   │   └── page.tsx
│   │   │   └── api/
│   │   │       ├── free/
│   │   │       │   └── route.ts
│   │   │       └── premium-data/
│   │   │           └── route.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ApiResponsePanel.tsx
│   │   │   ├── PaymentCard.tsx
│   │   │   └── StatusBadge.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── apiClient.ts
│   │   │   ├── constants.ts
│   │   │   ├── generateSnippet.ts
│   │   │   └── stellarPayment.ts
│   │   │
│   │   └── types/
│   │       ├── api.ts
│   │       └── payment.ts
│   │
│   └── demo-server/
│       ├── server.js
│       ├── package.json
│       └── .env.example
│
├── contracts/
│   ├── README.md
│   └── fainpi_registry/
│       ├── Cargo.toml
│       └── src/
│           ├── lib.rs
│           └── test.rs
│
├── docs/
│   └── demo-flow.md
│
├── Cargo.toml
├── package.json
└── README.md
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create frontend environment file

Create:

```txt
apps/web/.env.local
```

Example:

```env
NEXT_PUBLIC_DEMO_API_URL=/
NEXT_PUBLIC_PAYMENT_RECIPIENT=GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
NEXT_PUBLIC_PAYMENT_AMOUNT=0.01
```

### 3. Run web app

```bash
npm run dev:web
```

Frontend URL:

```txt
http://localhost:3000
```

### 4. Optional local Express demo server

```bash
cp apps/demo-server/.env.example apps/demo-server/.env
npm run dev:server
```

Demo server URL:

```txt
http://localhost:3002
```

---

## Demo API Endpoints

### Free Endpoint

```txt
GET /api/free
```

Example:

```bash
curl https://fainpi.vercel.app/api/free
```

Expected result:

```json
{
  "message": "This is a free API response.",
  "access": "public"
}
```

### Protected Endpoint Without Payment

```txt
GET /api/premium-data
```

Example:

```bash
curl -i https://fainpi.vercel.app/api/premium-data
```

Expected result:

```txt
HTTP/1.1 402 Payment Required
```

### Protected Endpoint With Demo Receipt

```bash
curl https://fainpi.vercel.app/api/premium-data \
  -H "x-fainpi-payment: paid"
```

Expected result:

```txt
Protected premium data is returned.
```

---

## Demo Flow

Recommended presentation flow:

1. Open the landing page.
2. Explain the problem: small developers need a simple way to monetize APIs per request.
3. Open the generator page.
4. Configure an example premium endpoint.
5. Show the generated Express middleware snippet.
6. Open the demo page.
7. Call the free endpoint.
8. Call the premium endpoint without payment.
9. Confirm the `402 Payment Required` response.
10. Open the payment page.
11. Connect Freighter.
12. Make sure Freighter is on Stellar Testnet.
13. Pay `0.01 XLM`.
14. Show the transaction hash.
15. Open the transaction on Stellar Expert.
16. Show the premium API response after payment.
17. Show the Soroban paywall registry contract deployment artifact.

---

## Freighter Payment Flow

The payment page demonstrates a wallet-based payment flow.

```txt
Connect Freighter
        ↓
Build native XLM payment transaction
        ↓
User signs transaction with Freighter
        ↓
Transaction is submitted to Stellar Testnet
        ↓
Transaction hash is displayed
        ↓
Premium API endpoint is unlocked
```

### Freighter Requirements

Before testing the payment page:

- Install Freighter wallet extension
- Switch Freighter to Stellar Testnet
- Use a funded Testnet account
- Make sure `NEXT_PUBLIC_PAYMENT_RECIPIENT` is a valid Stellar public key

---

## Soroban Paywall Registry Contract

FainPi includes a minimal Soroban paywall registry contract as a workshop deployment artifact.

The contract stores public API paywall metadata only. It is intentionally small, readable, and safe for a workshop MVP.

### What This Contract Does

- Stores the project name
- Stores the project version
- Stores the registry category
- Stores the owner address
- Stores the payment recipient address
- Stores the protected endpoint path
- Stores the price per request
- Stores the payment asset
- Stores the payment network
- Stores the MVP status disclaimer
- Provides public read methods

### What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not verify payment receipts
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

### Contract Methods

- `init(owner: Address, recipient: Address, endpoint_path: String, price: String, asset: String, payment_network: String)`
- `is_initialized() -> bool`
- `name() -> String`
- `version() -> String`
- `kind() -> String`
- `owner() -> Address`
- `recipient() -> Address`
- `endpoint_path() -> String`
- `price() -> String`
- `asset() -> String`
- `payment_network() -> String`
- `status() -> String`

---

## Final Testnet Contract Deployment

Network:

```txt
Stellar Testnet
```

Contract ID:

```txt
CA5D5QCSQGKTL65LEFEOFNKLFSBCTJPBHW34GBZ2CBMD6GUBM5BZBWDE
```

WASM upload transaction:

```txt
b0e9a0f78081b3c9e587b51f0299ee7f84d0d3874fe671249582a55eea8f58e8
```

Contract deploy transaction:

```txt
a9530525e87687f583ab491481a629dceb152fe1e34f36d9d717d613dd2dd82f
```

Initialization transaction:

```txt
1a6c70a5fd97f31195b4ec3a73dd2686e2a30051de55b24b7be94cdabf02a418
```

Readable metadata:

```txt
is_initialized: true
name: FainPi
version: 0.2.0
kind: Pay-per-request API paywall registry
owner: GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
recipient: GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
endpoint_path: /api/premium-data
price: 0.01
asset: XLM
payment_network: stellar:testnet
status: Workshop MVP - not production ready
```

---

## Contract Development

### Run contract tests

```bash
cargo test -p fainpi-registry
```

### Build contract

```bash
stellar contract build
```

### Deploy contract to testnet

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/fainpi_registry.wasm \
  --source-account najmi \
  --network testnet \
  --alias fainpi_paywall_registry_testnet
```

### Initialize contract

```bash
stellar contract invoke \
  --id fainpi_paywall_registry_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  init \
  --owner GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM \
  --recipient GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM \
  --endpoint_path "/api/premium-data" \
  --price "0.01" \
  --asset "XLM" \
  --payment_network "stellar:testnet"
```

### Read contract metadata

```bash
stellar contract invoke \
  --id fainpi_paywall_registry_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  endpoint_path
```

```bash
stellar contract invoke \
  --id fainpi_paywall_registry_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  price
```

```bash
stellar contract invoke \
  --id fainpi_paywall_registry_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  payment_network
```

---

## Build Checks

Before deployment, run:

```bash
npm run build --workspace apps/web
```

```bash
cargo test -p fainpi-registry
```

```bash
stellar contract build
```

Optional API checks:

```bash
curl https://fainpi.vercel.app/api/free
```

```bash
curl -i https://fainpi.vercel.app/api/premium-data
```

```bash
curl https://fainpi.vercel.app/api/premium-data \
  -H "x-fainpi-payment: paid"
```

---

## Deployment Notes

### Frontend Deployment

The Next.js frontend is deployed to Vercel.

Required environment variables:

```env
NEXT_PUBLIC_DEMO_API_URL=/
NEXT_PUBLIC_PAYMENT_RECIPIENT=GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
NEXT_PUBLIC_PAYMENT_AMOUNT=0.01
```

### Mainnet Deployment

Mainnet registry deployment is planned as a workshop artifact only.

The mainnet contract should use the same minimal paywall registry pattern and must not be described as a production payment system.

---

## Roadmap

### MVP

- API paywall demo
- Middleware generator
- Freighter payment page
- Native XLM Testnet payment
- Mock receipt-based API unlock
- Soroban paywall registry artifact

### Next Phase

- Full Stellar MPP Charge integration
- Real payment verification
- USDC/SAC payment flow
- Better middleware package
- Improved payment receipt handling
- Stronger docs for developers

### Future Phase

- MPP Session support
- Multi-endpoint dashboard
- Real earnings tracking
- API usage analytics
- API key management
- Production-grade payment verification

---

## Limitations

FainPi is currently an MVP and has several limitations:

- API unlock still uses a demo receipt header.
- Native XLM is used for easier workshop testing.
- Full MPP Charge verification is not implemented yet.
- No production-grade payment verification.
- No persistent database.
- No user authentication.
- No real earnings tracking.
- The Soroban contract stores metadata only.

---

## Important Disclaimer

FainPi is an educational workshop MVP and proof-of-concept.

It is not production-ready.

The current version demonstrates a Stellar-based pay-per-request API flow using a Freighter wallet payment on Stellar Testnet and a demo receipt-based API unlock.

The Soroban contract is only a minimal paywall registry artifact for public API paywall metadata. It does not custody funds, process API payments, verify receipts, or implement production billing logic.

The intended production direction is to integrate the API layer with full Stellar MPP Charge verification.

---

## Safe Pitch

FainPi helps developers monetize API endpoints with a lightweight pay-per-request flow on Stellar.

The MVP demonstrates an API paywall using HTTP `402 Payment Required`, a Freighter-based native XLM payment on Stellar Testnet, and premium endpoint unlock after payment submission.

A minimal Soroban paywall registry contract is deployed as a public API paywall metadata artifact. The next phase is full Stellar MPP Charge integration for production-grade payment verification.

---

## Built For

Stellar Indonesia / WO UNISKA

---

## Author

Muhammad Dzakwan Najmi