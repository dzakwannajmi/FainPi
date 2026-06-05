# FainPi Submission

## Project Name

FainPi

## One-Line Summary

FainPi is a lightweight API paywall generator for pay-per-request API monetization powered by Stellar.

## Project Description

FainPi helps developers turn API endpoints into paid endpoints using a simple pay-per-request flow.

The MVP demonstrates how a premium API endpoint can return `402 Payment Required`, accept a Stellar Testnet payment through Freighter, and unlock premium API data after payment submission.

FainPi also includes a minimal Soroban Paywall Registry contract that stores public API paywall metadata such as endpoint path, price, asset, payment network, and recipient address.

This project was built for Stellar Indonesia / WO UNISKA as an educational workshop MVP.

---

## Problem Statement

Small developers, students, and indie builders often have useful APIs, datasets, AI tools, or premium endpoints, but monetizing those endpoints per request is usually too complex.

Traditional API monetization often requires:

* Subscription billing
* Payment gateway integration
* API key billing system
* Manual payment verification
* External payment processor
* More infrastructure than a small developer needs

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

* HTTP `402 Payment Required`
* Freighter wallet connection
* Native XLM payment on Stellar Testnet
* Demo receipt header for API unlock
* Soroban Paywall Registry contract for public API paywall metadata

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

Expected result:

```txt
200 OK
```

### Premium Endpoint Without Payment

```txt
GET /api/premium-data
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

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* hls.js
* Freighter API
* Stellar SDK

### API Layer

* Next.js API Routes
* HTTP `402 Payment Required`
* Demo receipt header

### Smart Contract

* Rust
* Soroban SDK
* Stellar CLI
* Stellar Testnet

### Deployment

* Vercel
* GitHub

---

## Stellar Integration

FainPi integrates Stellar in three parts:

### 1. Freighter Wallet Payment

Users can connect Freighter and send a native XLM payment on Stellar Testnet.

### 2. Stellar Testnet Payment Flow

The payment page builds and submits a native XLM transaction. After payment submission, the premium endpoint is unlocked using the current demo receipt flow.

### 3. Soroban Paywall Registry Contract

FainPi includes a minimal Soroban contract that stores public API paywall metadata.

The contract stores:

* Project name
* Version
* Registry type
* Owner address
* Recipient address
* Endpoint path
* Price
* Asset
* Payment network
* MVP status disclaimer

---

## Soroban Testnet Contract

Network:

```txt
Stellar Testnet
```

Contract ID:

```txt
CA5D5QCSQGKTL65LEFEOFNKLFSBCTJPBHW34GBZ2CBMD6GUBM5BZBWDE
```

WASM Hash:

```txt
5c91ddef56ba3bcf32a45e696a29cb166bc4c14728148e8d37a872ed4bdc365a
```

WASM Upload Transaction:

```txt
b0e9a0f78081b3c9e587b51f0299ee7f84d0d3874fe671249582a55eea8f58e8
```

Contract Deploy Transaction:

```txt
a9530525e87687f583ab491481a629dceb152fe1e34f36d9d717d613dd2dd82f
```

Initialization Transaction:

```txt
1a6c70a5fd97f31195b4ec3a73dd2686e2a30051de55b24b7be94cdabf02a418
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
payment_network: stellar:testnet
status: Workshop MVP - not production ready
```

---

## Mainnet Status

Mainnet deployment is planned as a workshop deployment artifact only.

The mainnet contract will use the same minimal Paywall Registry pattern. It will not be described as a production payment system.

Mainnet contract purpose:

```txt
Store public API paywall metadata as a workshop artifact.
```

Mainnet contract does not:

* Custody funds
* Process API payments
* Verify receipts
* Implement production billing
* Act as escrow

---

## What Is Implemented

* Dark liquid-glass landing page
* API paywall generator UI
* Generated Express middleware snippet
* Internal Next.js API routes
* Free API endpoint
* Premium API endpoint
* HTTP `402 Payment Required` response
* Demo receipt-based API unlock
* Freighter wallet connection
* Native XLM payment on Stellar Testnet
* Transaction hash display
* Stellar Expert transaction link
* Soroban Paywall Registry contract
* Testnet contract deployment
* Registry page showing contract metadata
* Vercel live deployment

---

## What Is Planned

* Full Stellar MPP Charge verification
* Production-grade payment receipt validation
* USDC/SAC settlement support
* Multi-endpoint paywall registry
* Real earnings tracking
* API usage analytics
* Developer middleware package
* MPP Session support for high-frequency API payments

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
16. Show the Soroban Paywall Registry metadata.
17. Explain that full Stellar MPP Charge verification is the next phase.

---

## Limitations

FainPi is currently an educational workshop MVP.

Current limitations:

* API unlock still uses a demo receipt header.
* Native XLM is used for easier workshop testing.
* Full Stellar MPP Charge verification is not implemented yet.
* No production-grade payment verification.
* No persistent database.
* No user authentication.
* No real earnings tracking.
* The Soroban contract stores metadata only.

---

## Security and Safety Notes

The Soroban Paywall Registry contract is intentionally minimal.

It does not:

* Custody funds
* Transfer tokens
* Process API payments
* Verify receipts
* Implement billing logic
* Act as escrow
* Claim production readiness

The payment flow remains in the API layer and is planned to be upgraded with full Stellar MPP Charge verification.

---

## Why FainPi Fits Stellar

FainPi fits Stellar because it focuses on small, fast, and programmable payments for API access.

This is aligned with:

* Payment-enabled APIs
* Machine-to-machine payments
* Agentic payment flows
* Micropayment-friendly API monetization
* Future MPP Charge integration

FainPi demonstrates how APIs can request payment before returning premium responses.

---

## Safe Pitch

FainPi helps developers monetize API endpoints with a lightweight pay-per-request flow on Stellar.

The MVP demonstrates an API paywall using HTTP `402 Payment Required`, a Freighter-based native XLM payment on Stellar Testnet, and premium endpoint unlock after payment submission.

A minimal Soroban Paywall Registry contract is deployed as a public API paywall metadata artifact. The next phase is full Stellar MPP Charge integration for production-grade payment verification.

---

## Author

Muhammad Dzakwan Najmi

---

## Built For

Stellar Indonesia / WO UNISKA
