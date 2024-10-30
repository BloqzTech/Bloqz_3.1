# Healthcare Smart Contracts

This directory contains the smart contract templates for the Healthcare industry in the interchain platform.

## Structure

```
contracts/
├── interfaces/
│   └── IHealthcareContract.go    # Healthcare-specific interfaces
├── transactions/
│   └── MedicalTransactions.go    # Medical transaction handling
├── HealthcareContract.go         # Main healthcare contract implementation
└── README.md                     # This file
```

## Components

### Healthcare Interfaces

- `IHealthcareContract`: Extends base interchain contract with healthcare features
- `IHealthcareDataValidator`: Defines healthcare data validation
- `IHealthcareAudit`: Defines audit logging requirements

### Main Contract

The `HealthcareContract` implements healthcare-specific features:
- Medical record management
- HIPAA compliance validation
- Data encryption/decryption
- Access control
- Consent management
- Cross-chain integration

### Transaction Handler

The `MedicalTransactionHandler` manages:
- Diagnoses
- Prescriptions
- Lab tests
- Treatments
- Document management
- Multi-chain notifications

## Key Features

1. HIPAA Compliance:
   - Data privacy protection
   - Audit logging
   - Access control

2. Consent Management:
   - Patient consent tracking
   - Data sharing permissions
   - Time-bound authorizations

3. Security:
   - Data encryption
   - Access validation
   - Audit trails

## Usage

1. Initialize the contract:
```go
validator := NewHealthcareDataValidator()
auditor := NewHealthcareAuditor()
contract := NewHealthcareContract(validator, auditor)
```

2. Create a transaction handler:
```go
txHandler := NewMedicalTransactionHandler(contract)
```

3. Process medical transactions:
```go
tx := MedicalTransaction{
    TransactionID: "tx123",
    PatientID: "patient456",
    ProviderID: "provider789",
    TransactionType: Prescription,
    Timestamp: time.Now(),
}

err := txHandler.InitiateTransaction(ctx, tx)
```

## Cross-Chain Integration

The contract integrates with:
- Insurance chain for claims processing
- Pharmacy chain for prescriptions
- Laboratory chain for test results

Each interaction follows HIPAA guidelines and maintains patient privacy.
