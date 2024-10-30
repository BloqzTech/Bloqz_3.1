# Real Estate Smart Contracts

This directory contains the smart contract templates for the Real Estate industry in the interchain platform.

## Structure

```
contracts/
├── interfaces/
│   └── IInterchainContract.go    # Base interfaces for cross-chain communication
├── transactions/
│   └── PropertyTransactions.go   # Property transaction handling
├── RealEstateContract.go         # Main real estate contract implementation
└── README.md                     # This file
```

## Components

### Base Interfaces

- `IInterchainContract`: Defines the base interface for cross-chain communication
- `IDataValidator`: Defines the interface for data validation

### Main Contract

The `RealEstateContract` implements the base interfaces and provides:
- Property data management
- Cross-chain message handling
- Data validation
- Integration with other chains (Finance, Government, Insurance)

### Transaction Handler

The `PropertyTransactionHandler` manages:
- Property sales
- Property leases
- Property transfers
- Document management
- Multi-chain notifications

## Usage

1. Initialize the contract:
```go
validator := NewDataValidator()
contract := NewRealEstateContract(validator)
```

2. Create a transaction handler:
```go
txHandler := NewPropertyTransactionHandler(contract)
```

3. Process transactions:
```go
tx := PropertyTransaction{
    TransactionID: "tx123",
    PropertyID: "prop456",
    TransactionType: Sale,
    FromAddress: "seller_address",
    ToAddress: "buyer_address",
    Amount: sdk.NewInt(1000000),
    Timestamp: time.Now().Unix(),
}

err := txHandler.InitiateTransaction(ctx, tx)
```

## Cross-Chain Integration

The contract automatically integrates with:
- Finance chain for payments and mortgages
- Government chain for property registration and taxes
- Insurance chain for property insurance

Each interaction is handled through IBC channels with proper validation and error handling.
