# FainPi Paywall Registry Contract

This folder contains the minimal Soroban paywall registry contract for FainPi.

## Purpose

The `FainPiRegistry` contract stores public API paywall configuration as a workshop deployment artifact.

This contract is intentionally small, readable, and safe for an educational MVP. It does not process payments, custody funds, verify receipts, or implement production billing logic.

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

## Test Result

```txt
cargo test -p fainpi-registry

test result: ok. 2 passed; 0 failed
```

## Build Result

```txt
Wasm File: target/wasm32v1-none/release/fainpi_registry.wasm
Wasm Hash: 5c91ddef56ba3bcf32a45e696a29cb166bc4c14728148e8d37a872ed4bdc365a
Wasm Size: 3163 bytes
Exported Functions: 12
```

Exported functions:

```txt
asset
endpoint_path
init
is_initialized
kind
name
owner
payment_network
price
recipient
status
version
```

## Final Testnet Deployment

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

## Testnet Commands

Build contract:

```bash
stellar contract build
```

Deploy contract:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/fainpi_registry.wasm \
  --source-account najmi \
  --network testnet \
  --alias fainpi_paywall_registry_testnet
```

Initialize contract:

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

Read metadata:

```bash
stellar contract invoke \
  --id fainpi_paywall_registry_testnet \
  --source-account najmi \
  --network testnet \
  -- \
  name
```

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

## Mainnet Note

Mainnet deployment is intended only as a workshop deployment artifact.

The mainnet contract should use the same minimal paywall registry pattern and must not be described as a production payment system.

## Safe Claim

Minimal Soroban paywall registry contract for FainPi API paywall metadata. Payment flow remains in the API layer and is planned to be integrated with full Stellar MPP Charge verification.