package transactions

import (
	"encoding/json"
	"time"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/healthcare/contracts"
)

// TransactionType defines the type of medical transaction
type TransactionType string

const (
	Diagnosis   TransactionType = "DIAGNOSIS"
	Prescription TransactionType = "PRESCRIPTION"
	LabTest     TransactionType = "LAB_TEST"
	Treatment   TransactionType = "TREATMENT"
)

// MedicalTransaction represents a healthcare transaction
type MedicalTransaction struct {
	TransactionID   string          `json:"transaction_id"`
	PatientID       string          `json:"patient_id"`
	ProviderID      string          `json:"provider_id"`
	TransactionType TransactionType `json:"transaction_type"`
	Data            []byte          `json:"data"` // Encrypted medical data
	Timestamp       time.Time       `json:"timestamp"`
	Status          string          `json:"status"`
	Attachments     []Attachment    `json:"attachments"`
	Consent         []string        `json:"consent"` // List of consenting parties
}

// Attachment represents medical documents or images
type Attachment struct {
	AttachmentID string    `json:"attachment_id"`
	Type         string    `json:"type"`
	Hash         string    `json:"hash"`
	IPFSLink     string    `json:"ipfs_link"`
	Timestamp    time.Time `json:"timestamp"`
	UploadedBy   string    `json:"uploaded_by"`
}

// MedicalTransactionHandler handles healthcare transactions
type MedicalTransactionHandler struct {
	contract *contracts.HealthcareContract
}

func NewMedicalTransactionHandler(contract *contracts.HealthcareContract) *MedicalTransactionHandler {
	return &MedicalTransactionHandler{
		contract: contract,
	}
}

// InitiateTransaction starts a new medical transaction
func (h *MedicalTransactionHandler) InitiateTransaction(ctx sdk.Context, tx MedicalTransaction) error {
	// Validate transaction data
	if err := h.validateTransaction(tx); err != nil {
		return err
	}

	// Notify relevant chains
	if err := h.notifyRelevantChains(ctx, tx); err != nil {
		return err
	}

	return nil
}

// ValidateTransaction validates the transaction data
func (h *MedicalTransactionHandler) validateTransaction(tx MedicalTransaction) error {
	if tx.TransactionID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "transaction ID is required")
	}
	if tx.PatientID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "patient ID is required")
	}
	if tx.ProviderID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "provider ID is required")
	}
	if tx.TransactionType == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "transaction type is required")
	}

	return nil
}

// NotifyRelevantChains notifies other chains about the transaction
func (h *MedicalTransactionHandler) notifyRelevantChains(ctx sdk.Context, tx MedicalTransaction) error {
	txData, err := json.Marshal(tx)
	if err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "failed to marshal transaction data")
	}

	// Notify based on transaction type
	switch tx.TransactionType {
	case Prescription:
		if _, err := h.contract.PrepareInterchainMessage(ctx, "pharmacy", txData); err != nil {
			return err
		}
	case LabTest:
		if _, err := h.contract.PrepareInterchainMessage(ctx, "laboratory", txData); err != nil {
			return err
		}
	case Treatment:
		if _, err := h.contract.PrepareInterchainMessage(ctx, "insurance", txData); err != nil {
			return err
		}
	}

	return nil
}

// UpdateTransactionStatus updates the status of a medical transaction
func (h *MedicalTransactionHandler) UpdateTransactionStatus(ctx sdk.Context, txID string, status string) error {
	// Update transaction status and notify relevant chains
	return nil
}

// FinalizeTransaction completes the medical transaction process
func (h *MedicalTransactionHandler) FinalizeTransaction(ctx sdk.Context, txID string) error {
	// Finalize the transaction and update all relevant chains
	return nil
}
