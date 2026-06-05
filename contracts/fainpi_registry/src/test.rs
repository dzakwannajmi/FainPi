#![cfg(test)]

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Address, Env, String};

#[test]
fn it_initializes_project_metadata() {
    let env = Env::default();

    let contract_id = env.register(FainPiRegistry, ());
    let client = FainPiRegistryClient::new(&env, &contract_id);

    let owner = Address::generate(&env);

    client.init(&owner);

    assert_eq!(client.name(), String::from_str(&env, "FainPi"));
    assert_eq!(client.version(), String::from_str(&env, "0.1.0"));
    assert_eq!(
        client.kind(),
        String::from_str(&env, "Pay-per-request API monetization")
    );
    assert_eq!(client.owner(), owner);
    assert_eq!(
        client.status(),
        String::from_str(&env, "Workshop MVP - not production ready")
    );
}

#[test]
#[should_panic(expected = "Contract is already initialized")]
fn it_rejects_double_initialization() {
    let env = Env::default();

    let contract_id = env.register(FainPiRegistry, ());
    let client = FainPiRegistryClient::new(&env, &contract_id);

    let owner = Address::generate(&env);

    client.init(&owner);
    client.init(&owner);
}
