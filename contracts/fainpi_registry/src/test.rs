#![cfg(test)]

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Address, Env, String};

#[test]
fn it_initializes_paywall_registry_metadata() {
    let env = Env::default();

    let contract_id = env.register(FainPiRegistry, ());
    let client = FainPiRegistryClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let recipient = Address::generate(&env);
    let endpoint_path = String::from_str(&env, "/api/premium-data");
    let price = String::from_str(&env, "0.01");
    let asset = String::from_str(&env, "XLM");
    let payment_network = String::from_str(&env, "stellar:testnet");

    assert_eq!(client.is_initialized(), false);

    client.init(
        &owner,
        &recipient,
        &endpoint_path,
        &price,
        &asset,
        &payment_network,
    );

    assert_eq!(client.is_initialized(), true);
    assert_eq!(client.name(), String::from_str(&env, "FainPi"));
    assert_eq!(client.version(), String::from_str(&env, "0.2.0"));
    assert_eq!(
        client.kind(),
        String::from_str(&env, "Pay-per-request API paywall registry")
    );
    assert_eq!(client.owner(), owner);
    assert_eq!(client.recipient(), recipient);
    assert_eq!(client.endpoint_path(), endpoint_path);
    assert_eq!(client.price(), price);
    assert_eq!(client.asset(), asset);
    assert_eq!(client.payment_network(), payment_network);
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
    let recipient = Address::generate(&env);
    let endpoint_path = String::from_str(&env, "/api/premium-data");
    let price = String::from_str(&env, "0.01");
    let asset = String::from_str(&env, "XLM");
    let payment_network = String::from_str(&env, "stellar:testnet");

    client.init(
        &owner,
        &recipient,
        &endpoint_path,
        &price,
        &asset,
        &payment_network,
    );

    client.init(
        &owner,
        &recipient,
        &endpoint_path,
        &price,
        &asset,
        &payment_network,
    );
}
