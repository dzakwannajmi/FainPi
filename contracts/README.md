# FainPi Paywall Registry Contract

This folder contains the minimal Soroban Paywall Registry contract for FainPi.

## Purpose

The `FainPiRegistry` contract stores public API paywall configuration as a workshop deployment artifact.

This contract is intentionally small, readable, and safe for an educational MVP. It does not process payments, custody funds, verify receipts, or implement production billing logic.

---

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

---

## What This Contract Does Not Do

- It does not custody funds
- It does not process API payments
- It does not replace Stellar MPP Charge
- It does not verify payment receipts
- It does not implement billing logic
- It does not act as escrow
- It does not claim production readiness

---

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

---

## Safety Notes

- `init` can only be called once.
- All stored data is public metadata.
- Contract metadata is read-only after initialization.
- Payment logic remains in the API layer.
- This contract is only a deployment artifact for the workshop MVP.

---

## Test Result

```txt
cargo test -p fainpi-registry

test result: ok. 2 passed; 0 failed
```

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

## Mainnet Commands

Deploy contract:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/fainpi_registry.wasm \
  --source-account fajrin \
  --network mainnet \
  --rpc-url https://rpc.ankr.com/stellar_soroban \
  --network-passphrase "Public Global Stellar Network ; September 2015" \
  --alias fainpi_paywall_registry_mainnet
```

Initialize contract:

```bash
stellar contract invoke \
  --id CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R \
  --source-account najmi \
  --network mainnet \
  --rpc-url https://rpc.ankr.com/stellar_soroban \
  --network-passphrase "Public Global Stellar Network ; September 2015" \
  -- \
  init \
  --owner GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM \
  --recipient GDPAPDZWAKBXUPCNMI4YHAZ7DS7UOUTPGXAFDSWZG4URRMWHFSQTDQBM \
  --endpoint_path "/api/premium-data" \
  --price "0.01" \
  --asset "XLM" \
  --payment_network "stellar:mainnet"
```

Read metadata:

```bash
stellar contract invoke \
  --id CDKNRCWB3G4CRDKJTPQWRMI7ZV2PWFW3JX4GEI6YY5FGKLRMGD4EJ43R \
  --source-account najmi \
  --network mainnet \
  --rpc-url https://rpc.ankr.com/stellar_soroban \
  --network-passphrase "Public Global Stellar Network ; September 2015" \
  -- \
  payment_network
```

---

## Safe Claim

Minimal Soroban Paywall Registry contract for FainPi API paywall metadata.

The contract is deployed on Stellar Mainnet as a workshop artifact. Payment flow remains in the API layer and is planned to be integrated with full Stellar MPP Charge verification.

This contract does not custody funds, process API payments, verify receipts, or implement production billing logic.
