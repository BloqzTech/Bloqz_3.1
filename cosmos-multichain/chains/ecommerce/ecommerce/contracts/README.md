# E-commerce Smart Contracts

This directory contains the smart contract templates for the E-commerce industry in the interchain platform.

## Structure

```
contracts/
├── interfaces/
│   └── IEcommerceContract.go     # E-commerce specific interfaces
├── transactions/
│   └── OrderTransactions.go      # Order transaction handling
├── EcommerceContract.go          # Main e-commerce contract implementation
└── README.md                     # This file
```

## Components

### E-commerce Interfaces

- `IEcommerceContract`: Extends base interchain contract with e-commerce features
- `IProductManager`: Defines product management functionality
- `IOrderProcessor`: Defines order processing functionality
- `IShippingManager`: Defines shipping management functionality

### Main Contract

The `EcommerceContract` implements e-commerce-specific features:
- Product management
- Order processing
- Inventory management
- Payment processing
- Cross-chain integration

### Transaction Handler

The `OrderTransactionHandler` manages:
- New orders
- Order updates
- Order cancellations
- Refunds
- Document management
- Multi-chain notifications

## Key Features

1. Product Management:
   - Product catalog
   - Inventory tracking
   - Price management
   - Product validation

2. Order Processing:
   - Order creation
   - Status tracking
   - Payment integration
   - Shipping management

3. Cross-Chain Integration:
   - Payment processing with finance chain
   - Inventory sync with supply chain
   - Integration with retail chain

## Usage

1. Initialize the contract:
```go
productManager := NewProductManager()
orderProcessor := NewOrderProcessor()
shippingManager := NewShippingManager()
contract := NewEcommerceContract(productManager, orderProcessor, shippingManager)
```

2. Create a transaction handler:
```go
txHandler := NewOrderTransactionHandler(contract)
```

3. Process orders:
```go
req := OrderTransactionRequest{
    TransactionID: "tx123",
    OrderID: "order456",
    CustomerID: "customer789",
    TransactionType: NewOrder,
    TotalAmount: sdk.NewInt(1000000),
}

err := txHandler.InitiateTransaction(ctx, req)
```

## Cross-Chain Integration

The contract integrates with:
- Finance chain for payment processing
- Supply chain for inventory management
- Retail chain for point-of-sale integration

Each interaction includes proper validation and error handling.
