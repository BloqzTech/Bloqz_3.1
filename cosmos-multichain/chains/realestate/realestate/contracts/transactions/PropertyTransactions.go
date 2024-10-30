package transactions

import (
	"encoding/json"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/realestate/contracts"
)

// TransactionType defines the type of property transaction
type TransactionType string

const (
	Sale     TransactionType = "SALE"
	Lease    TransactionType = "LEASE"
	Transfer TransactionType = "TRANSFER"
)

// PropertyTransaction represents a property transaction
type PropertyTransaction struct {
	TransactionID   string          `json:"transaction_id"`
	PropertyID      string          `json:"property_id"`
	TransactionType TransactionType `json:"transaction_type"`
	FromAddress     string          `json:"from_address"`
	ToAddress       string          `json:"to_address"`
	Amount          sdk.Int         `json:"amount"`
	Timestamp       int64           `json:"timestamp"`
	Status          string          `json:"status"`
	Documents       []Document      `json:"documents"`
}

// Document represents legal documents associated with the transaction
type Document struct {
	DocType    string `json:"doc_type"`
	Hash       string `json:"hash"`
	IPFSLink   string `json:"ipfs_link"`
	Timestamp  int64  `json:"timestamp"`
	SignedBy   string `json:"signed_by"`
	Signature  string `json:"signature"`
}

// PropertyTransactionHandler handles property transactions
type PropertyTransactionHandler struct {
	contract *contracts.RealEstateContract
}

func NewPropertyTransactionHandler(contract *contracts.RealEstateContract) *PropertyTransactionHandler {
	return &PropertyTransactionHandler{
		contract: contract,
	}
}

// InitiateTransaction starts a new property transaction
func (h *PropertyTransactionHandler) InitiateTransaction(ctx sdk.Context, tx PropertyTransaction) error {
	// Validate transaction data
	if err := h.validateTransaction(tx); err != nil {
		return err
	}

	// Prepare and send messages to relevant chains
	if err := h.notifyRelevantChains(ctx, tx); err != nil {
		return err
	}

	return nil
}

// ValidateTransaction validates the transaction data
func (h *PropertyTransactionHandler) validateTransaction(tx PropertyTransaction) error {
	if tx.TransactionID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "transaction ID is required")
	}
	if tx.PropertyID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "property ID is required")
	}
	if tx.FromAddress == "" || tx.ToAddress == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "from and to addresses are required")
	}
	if tx.Amount.IsNil() || tx.Amount.IsNegative() {
		return errors.Wrap(errors.ErrInvalidRequest, "invalid transaction amount")
	}

	return nil
}

// NotifyRelevantChains notifies other chains about the transaction
func (h *PropertyTransactionHandler) notifyRelevantChains(ctx sdk.Context, tx PropertyTransaction) error {
	// Prepare transaction data
	txData, err := json.Marshal(tx)
	if err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "failed to marshal transaction data")
	}

	// Notify finance chain for payment processing
	if _, err := h.contract.PrepareInterchainMessage(ctx, "finance", txData); err != nil {
		return err
	}

	// Notify government chain for registration
	if _, err := h.contract.PrepareInterchainMessage(ctx, "government", txData); err != nil {
		return err
	}

	// Notify insurance chain for policy updates
	if _, err := h.contract.PrepareInterchainMessage(ctx, "insurance", txData); err != nil {
		return err
	}

	return nil
}

// UpdateTransactionStatus updates the status of a transaction
func (h *PropertyTransactionHandler) UpdateTransactionStatus(ctx sdk.Context, txID string, status string) error {
	// Update transaction status and notify relevant chains
	return nil
}

// FinalizeTransaction completes the transaction process
func (h *PropertyTransactionHandler) FinalizeTransaction(ctx sdk.Context, txID string) error {
	// Finalize the transaction and update all relevant chains
	return nil
}
