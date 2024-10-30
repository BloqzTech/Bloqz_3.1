package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IInsuranceContract extends the base interchain contract with insurance features
type IInsuranceContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// Insurance-specific functionality
	ProcessClaim(ctx sdk.Context, claim []byte) error
	ValidatePolicy(ctx sdk.Context, policy []byte) error
	CalculatePremium(ctx sdk.Context, policyType string, riskFactors []byte) (sdk.Int, error)
	AssessRisk(ctx sdk.Context, data []byte) (string, error)
}

// IPolicyManager defines the interface for policy management
type IPolicyManager interface {
	// CreatePolicy creates a new insurance policy
	CreatePolicy(ctx sdk.Context, policy []byte) error

	// UpdatePolicy updates an existing policy
	UpdatePolicy(ctx sdk.Context, policy []byte) error

	// CancelPolicy cancels an existing policy
	CancelPolicy(ctx sdk.Context, policyID string) error

	// GetPolicy retrieves policy information
	GetPolicy(ctx sdk.Context, policyID string) ([]byte, error)

	// ValidatePolicy validates policy details
	ValidatePolicy(ctx sdk.Context, policy []byte) error
}

// IClaimProcessor defines the interface for claim processing
type IClaimProcessor interface {
	// SubmitClaim submits a new insurance claim
	SubmitClaim(ctx sdk.Context, claim []byte) error

	// ProcessClaim processes an insurance claim
	ProcessClaim(ctx sdk.Context, claim []byte) error

	// UpdateClaimStatus updates the status of a claim
	UpdateClaimStatus(ctx sdk.Context, claimID string, status string) error

	// ValidateClaim validates claim details
	ValidateClaim(ctx sdk.Context, claim []byte) error
}

// IRiskAssessor defines the interface for risk assessment
type IRiskAssessor interface {
	// AssessRisk evaluates risk factors
	AssessRisk(ctx sdk.Context, data []byte) (string, error)

	// CalculatePremium calculates insurance premium
	CalculatePremium(ctx sdk.Context, policyType string, riskFactors []byte) (sdk.Int, error)

	// UpdateRiskModel updates the risk assessment model
	UpdateRiskModel(ctx sdk.Context, model []byte) error

	// ValidateRiskFactors validates risk assessment factors
	ValidateRiskFactors(ctx sdk.Context, factors []byte) error
}

// IComplianceManager defines the interface for insurance compliance
type IComplianceManager interface {
	// ValidateCompliance checks regulatory compliance
	ValidateCompliance(ctx sdk.Context, data []byte) error

	// LogCompliance records compliance checks
	LogCompliance(ctx sdk.Context, action string, result bool) error

	// UpdateRegulations updates compliance regulations
	UpdateRegulations(ctx sdk.Context, regulations []byte) error

	// GetComplianceReport generates compliance report
	GetComplianceReport(ctx sdk.Context, reportType string) ([]byte, error)
}
