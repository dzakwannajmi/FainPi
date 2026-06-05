````md
# FainPi

FainPi is a lightweight API paywall generator for pay-per-request API monetization powered by Stellar.

It helps developers protect API endpoints with a payment-required flow, generate Express middleware snippets, and demonstrate how API access can be unlocked after a Stellar-based payment.

> Built for Stellar Indonesia / WO UNISKA as an educational workshop MVP.

---

## Overview

FainPi demonstrates a simple idea:

> Turn any API endpoint into a paid endpoint.

A developer can configure an endpoint path, price, currency, Stellar recipient address, and description. FainPi then generates a middleware snippet and provides a demo flow where premium API access requires payment before the protected response is returned.

The MVP includes:

- API paywall demo with `402 Payment Required`
- Express demo server
- Middleware generator UI
- Freighter wallet payment page
- Native XLM payment on Stellar Testnet
- Premium API unlock after payment submission
- Minimal Soroban registry contract as deployment artifact

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
- Minimal Soroban registry contract for project metadata

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
- Express demo API server
- Protected endpoint with `402 Payment Required`
- Mock receipt-based API unlock
- Freighter wallet connection
- Native XLM payment on Stellar Testnet
- Transaction hash display
- Stellar Expert testnet transaction link
- Minimal Soroban registry contract
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

FainPi includes an Express demo server with:

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

### 4. Soroban Registry Contract

FainPi includes a minimal Soroban smart contract that stores public project metadata.

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

### Backend Demo Server

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
│   │   │   └── docs/
│   │   │       └── page.tsx
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

### 2. Copy backend environment file

```bash
cp apps/demo-server/.env.example apps/demo-server/.env
```

### 3. Create frontend environment file

Create:

```txt
apps/web/.env.local
```

Example:

```env
NEXT_PUBLIC_DEMO_API_URL=http://localhost:3002
NEXT_PUBLIC_PAYMENT_RECIPIENT=GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
NEXT_PUBLIC_PAYMENT_AMOUNT=0.01
```

### 4. Run demo server

```bash
npm run dev:server
```

Demo server URL:

```txt
http://localhost:3002
```

### 5. Run web app

```bash
npm run dev:web
```

Frontend URL:

```txt
http://localhost:3000
```

---

## Demo API Endpoints

### Root Endpoint

```txt
GET /
```

Example:

```bash
curl http://localhost:3002
```

Expected response:

```json
{
  "name": "FainPi Demo Server",
  "description": "Pay-per-request API monetization powered by Stellar MPP.",
  "status": "running"
}
```

### Free Endpoint

```txt
GET /api/free
```

Example:

```bash
curl http://localhost:3002/api/free
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
curl -i http://localhost:3002/api/premium-data
```

Expected result:

```txt
HTTP/1.1 402 Payment Required
```

### Protected Endpoint With Demo Receipt

```bash
curl http://localhost:3002/api/premium-data \
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
17. Show the Soroban registry contract deployment artifact.

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
- Make sure the demo server is running
- Make sure `NEXT_PUBLIC_PAYMENT_RECIPIENT` is a valid Stellar public key

---

## Soroban Registry Contract

FainPi includes a minimal Soroban registry contract as a workshop deployment artifact.

The contract stores public project metadata only. It is intentionally small, readable, and safe for a workshop MVP.

### What This Contract Does

- Stores the project name
- Stores the project version
- Stores the project category
- Stores the owner address
- Stores the MVP status disclaimer
- Provides public read methods

### What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

### Contract Methods

- `init(owner: Address)`
- `name() -> String`
- `version() -> String`
- `kind() -> String`
- `owner() -> Address`
- `status() -> String`

### Safety Notes

- `init` can only be called once.
- The owner address is stored as public metadata.
- Contract metadata is read-only after initialization.
- Payment logic remains in the API layer.
- This contract is only a deployment artifact for the workshop MVP.

---

## Final Testnet Contract Deployment

Network:

```txt
Stellar Testnet
```

Contract ID:

```txt
CB2MAXF7ZFH6QJQFQIGTSJALWPTMZZTO42SOZR6UUXA73OV2KKMQ5BWH
```

WASM upload transaction:

```txt
7041da67a751ed57af5c94315769077e2d313f84819c5e59d926e318668709b9
```

Contract deploy transaction:

```txt
6e381cbdb7b3753b83e636d12f9015ce62a8a9d3d3f3b5d41db7f86052021259
```

Initialization transaction:

```txt
c1a47f8775823eee1fd66e73196ed5943ec72db24306e9e16f420d54a222c6a9
```

Owner address:

```txt
GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
```

Readable metadata:

```txt
name: FainPi
version: 0.1.0
kind: Pay-per-request API monetization
owner: GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
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
  --alias fainpi_registry_clean_testnet
```

### Initialize contract

```bash
stellar contract invoke \
  --id fainpi_registry_clean_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  init \
  --owner GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
```

### Read contract metadata

```bash
stellar contract invoke \
  --id fainpi_registry_clean_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  name
```

```bash
stellar contract invoke \
  --id fainpi_registry_clean_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  status
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

Optional local API checks:

```bash
curl http://localhost:3002
```

```bash
curl -i http://localhost:3002/api/premium-data
```

```bash
curl http://localhost:3002/api/premium-data \
  -H "x-fainpi-payment: paid"
```

---

## Deployment Notes

### Frontend Deployment

The Next.js frontend can be deployed to Vercel.

Required environment variables:

```env
NEXT_PUBLIC_DEMO_API_URL=https://YOUR_BACKEND_URL
NEXT_PUBLIC_PAYMENT_RECIPIENT=GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
NEXT_PUBLIC_PAYMENT_AMOUNT=0.01
```

### Backend Deployment

The Express demo server should be deployed separately to a Node.js hosting provider such as Render, Railway, Fly.io, or another service that supports long-running Node.js servers.

Required backend environment variables:

```env
PORT=3002
PAYMENT_MODE=mock
STELLAR_NETWORK=testnet
STELLAR_RECIPIENT=GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
```

### Mainnet Deployment

Mainnet registry deployment is planned as a workshop artifact only.

The mainnet contract should use the same minimal registry pattern and must not be described as a production payment system.

---

## Roadmap

### MVP

- API paywall demo
- Middleware generator
- Freighter payment page
- Native XLM Testnet payment
- Mock receipt-based API unlock
- Soroban registry artifact

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

The Soroban contract is only a minimal registry artifact for public project metadata. It does not custody funds, process API payments, or implement production billing logic.

The intended production direction is to integrate the API layer with full Stellar MPP Charge verification.

---

## Safe Pitch

FainPi helps developers monetize API endpoints with a lightweight pay-per-request flow on Stellar.

The MVP demonstrates an API paywall using HTTP `402 Payment Required`, a Freighter-based native XLM payment on Stellar Testnet, and premium endpoint unlock after payment submission.

A minimal Soroban registry contract is deployed as a public project metadata artifact. The next phase is full Stellar MPP Charge integration for production-grade payment verification.

---

## Built For

Stellar Indonesia / WO UNISKA

---

## Author

Muhammad Dzakwan Najmi
````
