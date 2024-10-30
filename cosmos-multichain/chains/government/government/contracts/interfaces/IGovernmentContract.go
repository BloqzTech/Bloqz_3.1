package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IGovernmentContract extends the base interchain contract with government features
type IGovernmentContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// Government-specific functionality
	ValidateRegulation(ctx sdk.Context, regulation []byte) error
	ProcessCompliance(ctx sdk.Context, data []byte) error
	IssuePermit(ctx sdk.Context, permit []byte) error
	VerifyDocument(ctx sdk.Context, document []byte) error
}

// IRegulationManager defines the interface for regulation management
type IRegulationManager interface {
	// CreateRegulation creates a new regulation
	CreateRegulation(ctx sdk.Context, regulation []byte) error

	// UpdateRegulation updates an existing regulation
	UpdateRegulation(ctx sdk.Context, regulation []byte) error

	// DeactivateRegulation deactivates a regulation
	DeactivateRegulation(ctx sdk.Context, regulationID string) error

	// GetRegulation retrieves regulation information
	GetRegulation(ctx sdk.Context, regulationID string) ([]byte, error)

	// ValidateRegulation validates regulation details
	ValidateRegulation(ctx sdk.Context, regulation []byte) error
}

// IComplianceProcessor defines the interface for compliance processing
type IComplianceProcessor interface {
	// ProcessCompliance processes a compliance check
	ProcessCompliance(ctx sdk.Context, data []byte) error

	// ValidateCompliance validates compliance data
	ValidateCompliance(ctx sdk.Context, data []byte) error

	// UpdateComplianceStatus updates compliance status
	UpdateComplianceStatus(ctx sdk.Context, entityID string, status string) error

	// GetComplianceReport generates a compliance report
	GetComplianceReport(ctx sdk.Context, entityID string) ([]byte, error)
}

// IPermitManager defines the interface for permit management
type IPermitManager interface {
	// IssuePermit issues a new permit
	IssuePermit(ctx sdk.Context, permit []byte) error

	// RevokePermit revokes an existing permit
	RevokePermit(ctx sdk.Context, permitID string) error

	// UpdatePermit updates permit details
	UpdatePermit(ctx sdk.Context, permit []byte) error

	// ValidatePermit validates permit details
	ValidatePermit(ctx sdk.Context, permit []byte) error
}

// IDocumentVerifier defines the interface for document verification
type IDocumentVerifier interface {
	// VerifyDocument verifies document authenticity
	VerifyDocument(ctx sdk.Context, document []byte) error

	// RegisterDocument registers a new document
	RegisterDocument(ctx sdk.Context, document []byte) error

	// UpdateDocument updates document status
	UpdateDocument(ctx sdk.Context, documentID string, status string) error

	// GetDocumentHistory retrieves document history
	GetDocumentHistory(ctx sdk.Context, documentID string) ([]byte, error)
}

// IAuditManager defines the interface for government auditing
type IAuditManager interface {
	// LogAudit records audit events
	LogAudit(ctx sdk.Context, event []byte) error

	// GetAuditTrail retrieves audit trail
	GetAuditTrail(ctx sdk.Context, entityID string) ([]byte, error)

	// ValidateAudit validates audit data
	ValidateAudit(ctx sdk.Context, audit []byte) error

	// GenerateAuditReport generates audit report
	GenerateAuditReport(ctx sdk.Context, parameters []byte) ([]byte, error)
}
