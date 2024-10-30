package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IHealthcareContract extends the base interchain contract with healthcare-specific features
type IHealthcareContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// Healthcare-specific functionality
	ValidateHIPAACompliance(ctx sdk.Context, data []byte) error
	EncryptSensitiveData(data []byte) ([]byte, error)
	DecryptSensitiveData(encryptedData []byte) ([]byte, error)
	ValidateDataAccess(ctx sdk.Context, userAddress string, dataType string) error
}

// IHealthcareDataValidator defines the interface for healthcare data validation
type IHealthcareDataValidator interface {
	// ValidateData validates the healthcare data structure and content
	ValidateData(data []byte) error

	// ValidateAuthorization checks if the requester is authorized to access the data
	ValidateAuthorization(requesterID string, patientID string, dataType string) error

	// ValidateConsent checks if patient consent exists for data sharing
	ValidateConsent(patientID string, dataType string, recipientID string) error

	// ValidatePrivacy ensures HIPAA compliance of data handling
	ValidatePrivacy(data []byte) error
}

// IHealthcareAudit defines the interface for healthcare audit logging
type IHealthcareAudit interface {
	// LogAccess records data access events
	LogAccess(ctx sdk.Context, accessorID string, patientID string, dataType string) error

	// LogModification records data modification events
	LogModification(ctx sdk.Context, modifierID string, patientID string, dataType string) error

	// LogConsent records consent changes
	LogConsent(ctx sdk.Context, patientID string, consentType string, granted bool) error

	// GetAuditTrail retrieves the audit trail for specific data
	GetAuditTrail(ctx sdk.Context, patientID string, dataType string) ([]byte, error)
}
