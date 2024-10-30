package transactions

import (
	"encoding/json"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/insurance/contracts"
	"time"
)

// TransactionType defines the type of insurance transaction
type TransactionType string

const (
	NewPolicy    TransactionType = "NEW_POLICY"
	UpdatePolicy TransactionType = "UPDATE_POLICY"
	CancelPolicy TransactionType = "CANCEL_POLICY"
	FileClaim    TransactionType = "FILE_CLAIM"
	UpdateClaim  TransactionType = "UPDATE_CLAIM"
)

// InsuranceTransactionRequest represents an insurance transaction request
type InsuranceTransactionRequest struct {
	TransactionID   string          `json:"transaction_id"`
	TransactionType TransactionType `json:"transaction_type"`
	PolicyData      *PolicyData     `json:"policy_data,omitempty"`
	ClaimData       *ClaimData      `json:"claim_data,omitempty"`
	Timestamp       time.Time       `json:"timestamp"`
	Metadata        Metadata        `json:"metadata"`
}

// PolicyData contains policy-related information
type PolicyData struct {
	PolicyID   string            `json:"policy_id"`
	HolderID   string            `json:"holder_id"`
	Type       string            `json:"type"`
	Coverage   sdk.Int           `json:"coverage"`
	Premium    sdk.Int           `json:"premium"`
	StartDate  time.Time         `json:"start_date"`
	EndDate    time.Time         `json:"end_date"`
	Terms      map[string]string `json:"terms"`
	Documents  []Document        `json:"documents"`
}

// ClaimData contains claim-related information
type ClaimData struct {
	ClaimID     string     `json:"claim_id"`
	PolicyID    string     `json:"policy_id"`
	Type        string     `json:"type"`
	Amount      sdk.Int    `json:"amount"`
	Description string     `json:"description"`
	Evidence    []Evidence `json:"evidence"`
}

// Document represents supporting documentation
type Document struct {
	DocType    string    `json:"doc_type"`
	Hash       string    `json:"hash"`
	IPFSLink   string    `json:"ipfs_link"`
	UploadedAt time.Time `json:"uploaded_at"`
}

// Evidence represents claim evidence
type Evidence struct {
	Type        string    `json:"type"`
	Description string    `json:"description"`
	Hash        string    `json:"hash"`
	IPFSLink    string    `json:"ipfs_link"`
	UploadedAt  time.Time `json:"uploaded_at"`
}

// Metadata contains additional transaction information
type Metadata struct {
	References  []string          `json:"references"`
	Notes       string            `json:"notes"`
	Extra       map[string]string `json:"extra"`
}

// InsuranceTransactionHandler handles insurance transactions
type InsuranceTransactionHandler struct {
	contract *contracts.InsuranceContract
}

func NewInsuranceTransactionHandler(contract *contracts.InsuranceContract) *InsuranceTransactionHandler {
	return &InsuranceTransactionHandler{
		contract: contract,
	}
}

// InitiateTransaction starts a new insurance transaction
func (h *InsuranceTransactionHandler) InitiateTransaction(ctx sdk.Context, req InsuranceTransactionRequest) error {
	// Validate transaction request
	if err := h.validateRequest(req); err != nil {
		return err
	}

	// Process based on transaction type
	switch req.TransactionType {
	case NewPolicy:
		return h.processNewPolicy(ctx, req)
	case UpdatePolicy:
		return h.processUpdatePolicy(ctx, req)
	case CancelPolicy:
		return h.processCancelPolicy(ctx, req)
	case FileClaim:
		return h.processFileClaim(ctx, req)
	case UpdateClaim:
		return h.processUpdateClaim(ctx, req)
	default:
		return errors.Wrap(errors.ErrInvalidRequest, "unsupported transaction type")
	}
}

// ValidateRequest validates the transaction request
func (h *InsuranceTransactionHandler) validateRequest(req InsuranceTransactionRequest) error {
	if req.TransactionID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "transaction ID is required")
	}

	switch req.TransactionType {
	case NewPolicy, UpdatePolicy:
		if req.PolicyData == nil {
			return errors.Wrap(errors.ErrInvalidRequest, "policy data is required")
		}
		if req.PolicyData.PolicyID == "" {
			return errors.Wrap(errors.ErrInvalidRequest, "policy ID is required")
		}
		if req.PolicyData.Coverage.IsNil() || req.PolicyData.Coverage.IsNegative() {
			return errors.Wrap(errors.ErrInvalidRequest, "invalid coverage amount")
		}
	case FileClaim, UpdateClaim:
		if req.ClaimData == nil {
			return errors.Wrap(errors.ErrInvalidRequest, "claim data is required")
		}
		if req.ClaimData.ClaimID == "" {
			return errors.Wrap(errors.ErrInvalidRequest, "claim ID is required")
		}
		if req.ClaimData.Amount.IsNil() || req.ClaimData.Amount.IsNegative() {
			return errors.Wrap(errors.ErrInvalidRequest, "invalid claim amount")
		}
	}

	return nil
}

// Process different types of transactions
func (h *InsuranceTransactionHandler) processNewPolicy(ctx sdk.Context, req InsuranceTransactionRequest) error {
	policyData, err := json.Marshal(req.PolicyData)
	if err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "failed to marshal policy data")
	}
	return h.contract.ValidatePolicy(ctx, policyData)
}

func (h *InsuranceTransactionHandler) processUpdatePolicy(ctx sdk.Context, req InsuranceTransactionRequest) error {
	// Handle policy update logic
	return nil
}

func (h *InsuranceTransactionHandler) processCancelPolicy(ctx sdk.Context, req InsuranceTransactionRequest) error {
	// Handle policy cancellation logic
	return nil
}

func (h *InsuranceTransactionHandler) processFileClaim(ctx sdk.Context, req InsuranceTransactionRequest) error {
	claimData, err := json.Marshal(req.ClaimData)
	if err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "failed to marshal claim data")
	}
	return h.contract.ProcessClaim(ctx, claimData)
}

func (h *InsuranceTransactionHandler) processUpdateClaim(ctx sdk.Context, req InsuranceTransactionRequest) error {
	// Handle claim update logic
	return nil
}

// UpdateTransactionStatus updates the status of an insurance transaction
func (h *InsuranceTransactionHandler) UpdateTransactionStatus(ctx sdk.Context, txID string, status string) error {
	// Update transaction status and notify relevant chains
	return nil
}

// FinalizeTransaction completes the insurance transaction process
func (h *InsuranceTransactionHandler) FinalizeTransaction(ctx sdk.Context, txID string) error {
	// Finalize the transaction and update all relevant chains
	return nil
}
