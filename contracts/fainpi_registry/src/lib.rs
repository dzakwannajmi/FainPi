#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String, Symbol};

const KEY_NAME: Symbol = symbol_short!("name");
const KEY_VERSION: Symbol = symbol_short!("version");
const KEY_KIND: Symbol = symbol_short!("kind");
const KEY_OWNER: Symbol = symbol_short!("owner");
const KEY_STATUS: Symbol = symbol_short!("status");

#[contract]
pub struct FainPiRegistry;

#[contractimpl]
impl FainPiRegistry {
    /// Initializes the FainPi registry metadata.
    ///
    /// This method can only be called once. The contract is intentionally
    /// minimal and does not process payments, custody funds, or implement
    /// production billing logic.
    pub fn init(env: Env, owner: Address) {
        if env.storage().instance().has(&KEY_NAME) {
            panic!("Contract is already initialized");
        }

        env.storage()
            .instance()
            .set(&KEY_NAME, &String::from_str(&env, "FainPi"));

        env.storage()
            .instance()
            .set(&KEY_VERSION, &String::from_str(&env, "0.1.0"));

        env.storage().instance().set(
            &KEY_KIND,
            &String::from_str(&env, "Pay-per-request API monetization"),
        );

        env.storage().instance().set(&KEY_OWNER, &owner);

        env.storage().instance().set(
            &KEY_STATUS,
            &String::from_str(&env, "Workshop MVP - not production ready"),
        );
    }

    /// Returns the project name.
    pub fn name(env: Env) -> String {
        env.storage().instance().get(&KEY_NAME).unwrap()
    }

    /// Returns the project version.
    pub fn version(env: Env) -> String {
        env.storage().instance().get(&KEY_VERSION).unwrap()
    }

    /// Returns the project category.
    pub fn kind(env: Env) -> String {
        env.storage().instance().get(&KEY_KIND).unwrap()
    }

    /// Returns the owner address.
    pub fn owner(env: Env) -> Address {
        env.storage().instance().get(&KEY_OWNER).unwrap()
    }

    /// Returns the MVP status disclaimer.
    pub fn status(env: Env) -> String {
        env.storage().instance().get(&KEY_STATUS).unwrap()
    }
}

mod test;
