# FainPi

FainPi is a lightweight API paywall generator for pay-per-request API monetization powered by Stellar.

It helps developers turn API endpoints into paid endpoints using a simple payment-required flow. The MVP demonstrates HTTP `402 Payment Required`, Freighter wallet payment, premium API unlock, and a Soroban Paywall Registry contract deployed on Stellar Mainnet as a workshop artifact.

> Built for Stellar Indonesia / WO UNISKA as an educational workshop MVP.

---

## Live Demo

```txt
https://fainpi.vercel.app
```

---

## GitHub Repository

```txt
https://github.com/dzakwannajmi/FainPi
```

---

## Overview

FainPi demonstrates a simple idea:

> Turn any API endpoint into a paid endpoint.

A developer can configure an endpoint path, price, asset, Stellar recipient address, and description. FainPi then generates a middleware snippet and provides a demo flow where premium API access requires payment before the protected response is returned.

The MVP includes:

- API paywall demo with `402 Payment Required`
- Express middleware generator
- Internal Next.js API routes
- Freighter wallet payment page
- Native XLM payment on Stellar Testnet for safe live demo usage
- Premium API unlock after payment submission
- Minimal Soroban Paywall Registry contract deployed on Stellar Mainnet

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

FainPi simplifies this into:

```txt
One API request = one small payment.
```

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
- Soroban Paywall Registry contract on Stellar Mainnet for public API paywall metadata

---

## Demo Pages

```txt
Landing Page:
https://fainpi.vercel.app

Generator:
https://fainpi.vercel.app/generator

API Demo:
https://fainpi.vercel.app/demo

Payment:
https://fainpi.vercel.app/payment

Registry:
https://fainpi.vercel.app/registry

Docs:
https://fainpi.vercel.app/docs
```

---

## API Endpoints

### Free Endpoint

```txt
GET /api/free
```

Example:

```bash
curl https://fainpi.vercel.app/api/free
```

Expected result:

```txt
200 OK
```

### Premium Endpoint Without Payment

```txt
GET /api/premium-data
```

Example:

```bash
curl -i https://fainpi.vercel.app/api/premium-data
```

Expected result:

```txt
402 Payment Required
```

### Premium Endpoint With Demo Receipt

```bash
curl https://fainpi.vercel.app/api/premium-data \
  -H "x-fainpi-payment: paid"
```

Expected result:

```txt
Premium API data is returned.
```

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- hls.js
- Freighter API
- Stellar SDK

### API Layer

- Next.js API Routes
- HTTP `402 Payment Required`
- Demo receipt header

### Smart Contract

- Rust
- Soroban SDK
- Stellar CLI
- Stellar Mainnet

### Deployment

- Vercel
- GitHub
- Stellar Mainnet

---

## Stellar Integration

FainPi integrates Stellar in three parts:

### 1. Freighter Wallet Payment

Users can connect Freighter and send a native XLM payment on Stellar Testnet.

The live payment demo uses Stellar Testnet for safety and workshop demonstration purposes.

### 2. API Paywall Flow

The premium endpoint returns `402 Payment Required` when accessed without payment. After payment submission, the current MVP unlocks the premium endpoint using a demo receipt header.

### 3. Soroban Paywall Registry Contract

FainPi includes a minimal Soroban contract deployed on Stellar Mainnet.

The contract stores public API paywall metadata:

- Project name
- Version
- Registry type
- Owner address
- Recipient address
- Endpoint path
- Price
- Asset
- Payment network
- MVP status disclaimer

---

## Final Mainnet Deployment

Network:

```txt
Stellar Mainnet
```

Contract ID:

```txt
CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R
```

WASM Hash:

```txt
d891b45262573dde0a206e4bd849f600c6abcb7ebec7ecaf55e3110d379009bb
```

WASM Upload Transaction:

```txt
0e95ff576594a212cc493d9a48fdcf11a8a5acac40651f4c55ebebe1f0416c2c
```

Contract Deploy Transaction:

```txt
e5e1003726a0844e085e464418028b002b4c1c757655cc15d44376b7bc17692d
```

Initialization Transaction:

```txt
748a9fffcaa7282d8d3e5bdc68641b9559999401bd3446bfc6308371bb176fd9
```

Stellar Lab:

```txt
https://lab.stellar.org/r/mainnet/contract/CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R
```

Readable Metadata:

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
payment_network: stellar:mainnet
status: Workshop MVP - not production ready
```

---

## Contract Purpose

The Soroban contract is a minimal Paywall Registry artifact.

It stores public metadata for the protected API endpoint. It does not process payments.

### What This Contract Does

- Stores project name
- Stores project version
- Stores registry category
- Stores owner address
- Stores payment recipient address
- Stores protected endpoint path
- Stores price per request
- Stores payment asset
- Stores payment network
- Stores MVP status disclaimer
- Provides public read methods

### What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not verify payment receipts
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the web app:

```bash
npm run dev:web
```

Run the optional local demo server:

```bash
npm run dev:server
```

Build the web app:

```bash
npm run build --workspace apps/web
```

Run contract tests:

```bash
cargo test -p fainpi-registry
```

Build the contract:

```bash
stellar contract build
```

---

## Demo Flow

Recommended presentation flow:

1. Open the landing page.
2. Explain the problem: small developers need a simple way to monetize APIs per request.
3. Open the Generator page.
4. Generate a middleware snippet for `/api/premium-data`.
5. Open the Demo page.
6. Call the free endpoint.
7. Call the premium endpoint without payment.
8. Show the `402 Payment Required` response.
9. Open the Payment page.
10. Connect Freighter.
11. Make sure Freighter is on Stellar Testnet.
12. Pay `0.01 XLM`.
13. Show the transaction hash.
14. Show the premium API response after payment.
15. Open the Registry page.
16. Show the Soroban Paywall Registry contract on Stellar Mainnet.
17. Explain that full Stellar MPP Charge verification is the next phase.

---

## What Is Implemented

- Dark liquid-glass landing page
- API paywall generator UI
- Generated Express middleware snippet
- Internal Next.js API routes
- Free API endpoint
- Premium API endpoint
- HTTP `402 Payment Required` response
- Demo receipt-based API unlock
- Freighter wallet connection
- Native XLM payment on Stellar Testnet
- Transaction hash display
- Stellar Expert transaction link
- Soroban Paywall Registry contract
- Final Stellar Mainnet deployment
- Registry page showing contract metadata
- Vercel live deployment

---

## What Is Planned

- Full Stellar MPP Charge verification
- Production-grade payment receipt validation
- USDC/SAC settlement support
- Multi-endpoint paywall registry
- Real earnings tracking
- API usage analytics
- Developer middleware package
- MPP Session support for high-frequency API payments

---

## Limitations

FainPi is currently an educational workshop MVP.

Current limitations:

- API unlock still uses a demo receipt header.
- Native XLM on Stellar Testnet is used for safer live payment testing.
- Full Stellar MPP Charge verification is not implemented yet.
- No production-grade payment verification.
- No persistent database.
- No user authentication.
- No real earnings tracking.
- The Soroban contract stores metadata only.

---

## Important Disclaimer

FainPi is an educational workshop MVP and proof-of-concept.

It is not production-ready.

The live payment demo uses Stellar Testnet for safety. The Stellar Mainnet contract is a workshop deployment artifact that stores public API paywall metadata only.

The Soroban contract does not custody funds, process API payments, verify receipts, or implement production billing logic.

The intended production direction is to integrate the API layer with full Stellar MPP Charge verification.

---

## Safe Pitch

FainPi helps developers monetize API endpoints with a lightweight pay-per-request flow on Stellar.

The MVP demonstrates an API paywall using HTTP `402 Payment Required`, a Freighter-based native XLM payment on Stellar Testnet, and premium endpoint unlock after payment submission.

A minimal Soroban Paywall Registry contract is deployed on Stellar Mainnet as a public API paywall metadata artifact. The next phase is full Stellar MPP Charge integration for production-grade payment verification.

---

## Author

Muhammad Dzakwan Najmi

---

## Built For

Stellar Indonesia / WO UNISKA
