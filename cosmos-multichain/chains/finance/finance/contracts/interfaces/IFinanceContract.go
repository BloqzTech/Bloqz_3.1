package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IFinanceContract extends the base interchain contract with finance-specific features
type IFinanceContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// Finance-specific functionality
	ValidateTransaction(ctx sdk.Context, tx []byte) error
	CalculateFees(ctx sdk.Context, amount sdk.Int, txType string) (sdk.Int, error)
	ValidateCompliance(ctx sdk.Context, tx []byte) error
	ProcessPayment(ctx sdk.Context, payment []byte) error
}

// IFinanceValidator defines the interface for financial data validation
type IFinanceValidator interface {
	// ValidateTransaction validates financial transaction structure and content
	ValidateTransaction(tx []byte) error

	// ValidateAmount checks if the amount is valid for the transaction type
	ValidateAmount(amount sdk.Int, txType string) error

	// ValidateParties checks if all parties in the transaction are valid
	ValidateParties(parties []string) error

	// ValidateCompliance ensures regulatory compliance
	ValidateCompliance(tx []byte) error
}

// IFinanceAudit defines the interface for financial audit logging
type IFinanceAudit interface {
	// LogTransaction records transaction events
	LogTransaction(ctx sdk.Context, txID string, txType string, amount sdk.Int) error

	// LogCompliance records compliance checks
	LogCompliance(ctx sdk.Context, txID string, complianceType string, result bool) error

	// LogRiskAssessment records risk assessment results
	LogRiskAssessment(ctx sdk.Context, txID string, riskLevel string) error

	// GetAuditTrail retrieves the audit trail for specific transactions
	GetAuditTrail(ctx sdk.Context, txID string) ([]byte, error)
}

// IRiskAssessment defines the interface for financial risk assessment
type IRiskAssessment interface {
	// AssessTransactionRisk evaluates the risk level of a transaction
	AssessTransactionRisk(ctx sdk.Context, tx []byte) (string, error)

	// ValidateRiskThresholds checks if transaction meets risk thresholds
	ValidateRiskThresholds(ctx sdk.Context, amount sdk.Int, riskLevel string) error

	// UpdateRiskProfile updates the risk profile of an entity
	UpdateRiskProfile(ctx sdk.Context, entityID string, riskData []byte) error

	// GetRiskReport generates a risk report for an entity
	GetRiskReport(ctx sdk.Context, entityID string) ([]byte, error)
}
