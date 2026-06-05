# FainPi Paywall Registry Contract

This folder contains the minimal Soroban paywall registry contract for FainPi.

## Purpose

The `FainPiRegistry` contract stores public API paywall configuration as a workshop deployment artifact.

This contract is intentionally small and does not process payments.

## What This Contract Does

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

## What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not verify payment receipts
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

## Contract Methods

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

## Safety Notes

- `init` can only be called once.
- All stored data is public metadata.
- Contract metadata is read-only after initialization.
- Payment logic remains in the API layer.
- This contract is only a deployment artifact for the workshop MVP.

## Safe Claim

Minimal Soroban paywall registry contract for FainPi API paywall metadata. Payment flow remains in the API layer and is planned to be integrated with Stellar MPP Charge.