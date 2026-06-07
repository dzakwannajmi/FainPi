# FainPi

FainPi is a lightweight API paywall generator for pay-per-request monetization, powered by Stellar.

It enables developers to protect any API endpoint behind a simple payment-required flow. The MVP demonstrates HTTP `402 Payment Required`, Freighter wallet payment, premium API unlock, and a minimal Soroban Paywall Registry contract deployed on Stellar Mainnet as a workshop artifact.

> Built for Stellar Indonesia / WO UNISKA as an educational workshop MVP.

---

## Live Demo

```
https://fainpi.vercel.app
```

## Repository

```
https://github.com/dzakwannajmi/FainPi
```

---

## Overview

FainPi demonstrates a single, focused idea:

> Turn any API endpoint into a paid endpoint.

A developer configures an endpoint path, price, asset, Stellar recipient address, and description. FainPi generates a ready-to-use middleware snippet and provides a demo flow where premium API access is gated behind a Stellar payment.

**MVP includes:**

- `402 Payment Required` API paywall demo
- Express middleware generator
- Internal Next.js API routes
- Freighter wallet payment page
- Native XLM payment on Stellar Testnet
- Premium API unlock after payment submission
- Minimal Soroban Paywall Registry contract deployed on Stellar Mainnet

---

## Problem Statement

Small developers, students, and indie builders often have useful APIs, datasets, AI endpoints, or premium tools — but monetizing them on a per-request basis is typically too complex.

Traditional API monetization requires:

- Subscription billing infrastructure
- Payment gateway integration
- API key billing systems
- Manual payment verification
- External payment processors

FainPi simplifies this to a single principle:

```
One API request = one small payment.
```

---

## Solution

FainPi provides a lightweight API paywall flow:

```
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

The current MVP implements this flow using:

- HTTP `402 Payment Required`
- Freighter wallet connection
- Native XLM payment on Stellar Testnet
- Demo receipt header for API unlock
- Soroban Paywall Registry contract on Stellar Mainnet for public API paywall metadata

---

## Demo Pages

| Page | URL |
|------|-----|
| Landing | `https://fainpi.vercel.app` |
| Generator | `https://fainpi.vercel.app/generator` |
| API Demo | `https://fainpi.vercel.app/demo` |
| Payment | `https://fainpi.vercel.app/payment` |
| Registry | `https://fainpi.vercel.app/registry` |
| Docs | `https://fainpi.vercel.app/docs` |

---

## API Endpoints

### Free Endpoint

```bash
GET /api/free
```

```bash
curl https://fainpi.vercel.app/api/free
# → 200 OK
```

### Premium Endpoint — Without Payment

```bash
GET /api/premium-data
```

```bash
curl -i https://fainpi.vercel.app/api/premium-data
# → 402 Payment Required
```

### Premium Endpoint — With Demo Receipt

```bash
curl https://fainpi.vercel.app/api/premium-data \
  -H "x-fainpi-payment: paid"
# → Premium API data returned
```

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
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

---

## Stellar Integration

FainPi integrates Stellar across three layers:

### 1. Freighter Wallet Payment

Users connect Freighter and send a native XLM payment on Stellar Testnet. Testnet is used intentionally for safe live demo usage during the workshop.

### 2. API Paywall Flow

The premium endpoint returns `402 Payment Required` when accessed without payment. After payment submission, the current MVP unlocks the premium endpoint using a demo receipt header (`x-fainpi-payment: paid`).

### 3. Soroban Paywall Registry Contract

FainPi includes a minimal Soroban contract deployed on Stellar Mainnet that stores public API paywall metadata:

- Project name and version
- Registry category
- Owner and recipient address
- Protected endpoint path
- Price, asset, and payment network
- MVP status disclaimer

---

## Mainnet Contract

| Field | Value |
|-------|-------|
| Network | Stellar Mainnet |
| Contract ID | `CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R` |
| WASM Hash | `d891b45262573dde0a206e4bd849f600c6abcb7ebec7ecaf55e3110d379009bb` |
| WASM Upload Tx | `0e95ff576594a212cc493d9a48fdcf11a8a5acac40651f4c55ebebe1f0416c2c` |
| Deploy Tx | `e5e1003726a0844e085e464418028b002b4c1c757655cc15d44376b7bc17692d` |
| Init Tx | `748a9fffcaa7282d8d3e5bdc68641b9559999401bd3446bfc6308371bb176fd9` |
| Stellar Lab | [View on Stellar Lab](https://lab.stellar.org/r/mainnet/contract/CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R) |

**Readable contract state:**

```
is_initialized   : true
name             : FainPi
version          : 0.2.0
kind             : Pay-per-request API paywall registry
owner            : GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
recipient        : GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM
endpoint_path    : /api/premium-data
price            : 0.01
asset            : XLM
payment_network  : stellar:mainnet
status           : Workshop MVP - not production ready
```

---

## Contract Scope

The Soroban contract is a minimal Paywall Registry artifact. It stores public metadata for the protected API endpoint and is readable by anyone on-chain.

**What this contract does:**
- Stores project name, version, and registry category
- Stores owner and recipient address
- Stores protected endpoint path, price, asset, and payment network
- Stores MVP status disclaimer
- Exposes public read methods

**What this contract does not do:**
- Custody funds
- Process API payments
- Verify payment receipts
- Implement billing logic
- Replace Stellar MPP Charge
- Act as escrow
- Claim production readiness

---

## Local Development

**Install dependencies:**

```bash
npm install
```

**Run the web app:**

```bash
npm run dev:web
```

**Run the optional local demo server:**

```bash
npm run dev:server
```

**Build the web app:**

```bash
npm run build --workspace apps/web
```

**Run contract tests:**

```bash
cargo test -p fainpi-registry
```

**Build the contract:**

```bash
stellar contract build
```

---

## Demo Flow

Recommended presentation order:

1. Open the landing page — introduce the problem.
2. Open the **Generator** page — configure and generate a middleware snippet for `/api/premium-data`.
3. Open the **Demo** page — call the free endpoint, then the premium endpoint without payment to show `402 Payment Required`.
4. Open the **Payment** page — connect Freighter (set to Stellar Testnet), pay `0.01 XLM`, and show the transaction hash.
5. Show the premium API response unlocked after payment.
6. Open the **Registry** page — show the Soroban Paywall Registry contract on Stellar Mainnet.
7. Close with the roadmap: full Stellar MPP Charge integration is the next phase.

---

## Implementation Status

| Feature | Status |
|---------|--------|
| Landing page | ✅ Done |
| API paywall generator UI | ✅ Done |
| Generated Express middleware snippet | ✅ Done |
| Internal Next.js API routes | ✅ Done |
| Free API endpoint | ✅ Done |
| Premium API endpoint | ✅ Done |
| HTTP `402 Payment Required` | ✅ Done |
| Demo receipt-based API unlock | ✅ Done |
| Freighter wallet connection | ✅ Done |
| Native XLM payment on Stellar Testnet | ✅ Done |
| Transaction hash display | ✅ Done |
| Stellar Expert transaction link | ✅ Done |
| Soroban Paywall Registry contract | ✅ Done |
| Stellar Mainnet deployment | ✅ Done |
| Registry page | ✅ Done |
| Vercel deployment | ✅ Done |
| Full Stellar MPP Charge verification | 📋 Planned |
| USDC/SAC settlement | 📋 Planned |
| Multi-endpoint paywall registry | 📋 Planned |
| Real earnings tracking | 📋 Planned |
| API usage analytics | 📋 Planned |
| MPP Session support | 📋 Planned |

---

## Known Limitations

FainPi is an educational workshop MVP and has intentional scope constraints:

- API unlock uses a demo receipt header — not cryptographic payment verification.
- Native XLM on Stellar Testnet is used for safer live payment demonstration.
- Full Stellar MPP Charge verification is not yet implemented.
- No persistent database, user authentication, or real earnings tracking.
- The Soroban contract stores metadata only — it does not process payments.

---

## Disclaimer

FainPi is an educational workshop MVP and proof-of-concept. It is not production-ready.

The live payment demo runs on Stellar Testnet for safety. The Stellar Mainnet contract is a workshop deployment artifact that stores public API paywall metadata only — it does not custody funds, process payments, verify receipts, or implement billing logic.

The intended production direction is full Stellar MPP Charge integration for on-chain payment verification per API request.

---

## Safe Pitch

FainPi enables developers to monetize API endpoints with a lightweight pay-per-request flow on Stellar.

The MVP demonstrates an API paywall using HTTP `402 Payment Required`, a Freighter-based native XLM payment on Stellar Testnet, and premium endpoint unlock after payment submission.

A minimal Soroban Paywall Registry contract is deployed on Stellar Mainnet as a public API paywall metadata artifact. The next phase targets full Stellar MPP Charge integration for production-grade, on-chain payment verification.

---

## Author

Muhammad Dzakwan Najmi

## Built For

Stellar Indonesia / WO UNISKA