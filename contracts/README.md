# FainPi Registry Contract

This folder contains the minimal Soroban registry contract for FainPi.

## Purpose

The `FainPiRegistry` contract stores public project metadata as a workshop deployment artifact.

This contract is intentionally small and does not process payments.

## What This Contract Does

- Stores project name
- Stores project version
- Stores project category
- Stores owner address
- Stores MVP status disclaimer
- Provides public read methods

## What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

## Contract Methods

- `init(owner: Address)`
- `name() -> String`
- `version() -> String`
- `kind() -> String`
- `owner() -> Address`
- `status() -> String`

## Safety Notes

- `init` can only be called once.
- The owner address is stored as public metadata.
- Contract metadata is read-only after initialization.
- Payment logic remains in the API layer.
- This contract is only a deployment artifact for the workshop MVP.

## Final Testnet Deployment

Network:

```txt
Stellar Testnet