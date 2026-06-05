#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String, Symbol};

const KEY_NAME: Symbol = symbol_short!("name");
const KEY_VERSION: Symbol = symbol_short!("version");
const KEY_KIND: Symbol = symbol_short!("kind");
const KEY_OWNER: Symbol = symbol_short!("owner");
const KEY_RECIPIENT: Symbol = symbol_short!("recipient");
const KEY_ENDPOINT: Symbol = symbol_short!("endpoint");
const KEY_PRICE: Symbol = symbol_short!("price");
const KEY_ASSET: Symbol = symbol_short!("asset");
const KEY_PAYMENT_NETWORK: Symbol = symbol_short!("paynet");
const KEY_STATUS: Symbol = symbol_short!("status");

#[contract]
pub struct FainPiRegistry;

#[contractimpl]
impl FainPiRegistry {
    /// Initializes the FainPi paywall registry metadata.
    ///
    /// This contract stores public API paywall configuration only.
    /// It does not custody funds, process payments, or implement billing logic.
    pub fn init(
        env: Env,
        owner: Address,
        recipient: Address,
        endpoint_path: String,
        price: String,
        asset: String,
        payment_network: String,
    ) {
        if env.storage().instance().has(&KEY_NAME) {
            panic!("Contract is already initialized");
        }

        env.storage()
            .instance()
            .set(&KEY_NAME, &String::from_str(&env, "FainPi"));

        env.storage()
            .instance()
            .set(&KEY_VERSION, &String::from_str(&env, "0.2.0"));

        env.storage().instance().set(
            &KEY_KIND,
            &String::from_str(&env, "Pay-per-request API paywall registry"),
        );

        env.storage().instance().set(&KEY_OWNER, &owner);
        env.storage().instance().set(&KEY_RECIPIENT, &recipient);
        env.storage().instance().set(&KEY_ENDPOINT, &endpoint_path);
        env.storage().instance().set(&KEY_PRICE, &price);
        env.storage().instance().set(&KEY_ASSET, &asset);
        env.storage()
            .instance()
            .set(&KEY_PAYMENT_NETWORK, &payment_network);

        env.storage().instance().set(
            &KEY_STATUS,
            &String::from_str(&env, "Workshop MVP - not production ready"),
        );
    }

    /// Returns true when the registry has been initialized.
    pub fn is_initialized(env: Env) -> bool {
        env.storage().instance().has(&KEY_NAME)
    }

    /// Returns the project name.
    pub fn name(env: Env) -> String {
        env.storage().instance().get(&KEY_NAME).unwrap()
    }

    /// Returns the project version.
    pub fn version(env: Env) -> String {
        env.storage().instance().get(&KEY_VERSION).unwrap()
    }

    /// Returns the registry category.
    pub fn kind(env: Env) -> String {
        env.storage().instance().get(&KEY_KIND).unwrap()
    }

    /// Returns the owner address.
    pub fn owner(env: Env) -> Address {
        env.storage().instance().get(&KEY_OWNER).unwrap()
    }

    /// Returns the payment recipient address.
    pub fn recipient(env: Env) -> Address {
        env.storage().instance().get(&KEY_RECIPIENT).unwrap()
    }

    /// Returns the protected API endpoint path.
    pub fn endpoint_path(env: Env) -> String {
        env.storage().instance().get(&KEY_ENDPOINT).unwrap()
    }

    /// Returns the configured price per request.
    pub fn price(env: Env) -> String {
        env.storage().instance().get(&KEY_PRICE).unwrap()
    }

    /// Returns the configured payment asset.
    pub fn asset(env: Env) -> String {
        env.storage().instance().get(&KEY_ASSET).unwrap()
    }

    /// Returns the configured payment network.
    pub fn payment_network(env: Env) -> String {
        env.storage().instance().get(&KEY_PAYMENT_NETWORK).unwrap()
    }

    /// Returns the MVP status disclaimer.
    pub fn status(env: Env) -> String {
        env.storage().instance().get(&KEY_STATUS).unwrap()
    }
}

mod test;
