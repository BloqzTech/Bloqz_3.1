package contracts

import (
	"encoding/json"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/realestate/contracts/interfaces"
)

// PropertyData represents the core property information
type PropertyData struct {
	PropertyID    string  `json:"property_id"`
	Address       string  `json:"address"`
	OwnerAddress  string  `json:"owner_address"`
	Price         sdk.Int `json:"price"`
	Size          float64 `json:"size"`
	PropertyType  string  `json:"property_type"`
	Status        string  `json:"status"` // Available, Sold, Under Contract
	DocumentHash  string  `json:"document_hash"`
	LastModified  int64   `json:"last_modified"`
}

// RealEstateContract implements the IInterchainContract interface
type RealEstateContract struct {
	keeper interfaces.IDataValidator
}

func NewRealEstateContract(keeper interfaces.IDataValidator) *RealEstateContract {
	return &RealEstateContract{
		keeper: keeper,
	}
}

// ValidateInterchainData implements IInterchainContract
func (c *RealEstateContract) ValidateInterchainData(ctx sdk.Context, data []byte) error {
	var property PropertyData
	if err := json.Unmarshal(data, &property); err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "invalid property data format")
	}

	// Validate required fields
	if property.PropertyID == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "property ID is required")
	}
	if property.Address == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "address is required")
	}
	if property.OwnerAddress == "" {
		return errors.Wrap(errors.ErrInvalidRequest, "owner address is required")
	}
	if property.Price.IsNil() || property.Price.IsNegative() {
		return errors.Wrap(errors.ErrInvalidRequest, "invalid price")
	}

	return nil
}

// ProcessInterchainMessage implements IInterchainContract
func (c *RealEstateContract) ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error {
	// Validate the incoming message
	if err := c.ValidateInterchainData(ctx, message); err != nil {
		return err
	}

	var property PropertyData
	if err := json.Unmarshal(message, &property); err != nil {
		return errors.Wrap(errors.ErrInvalidRequest, "failed to unmarshal property data")
	}

	// Process based on source chain
	switch sourceChain {
	case "finance":
		return c.handleFinanceChainMessage(ctx, property)
	case "government":
		return c.handleGovernmentChainMessage(ctx, property)
	case "insurance":
		return c.handleInsuranceChainMessage(ctx, property)
	default:
		return fmt.Errorf("unsupported source chain: %s", sourceChain)
	}
}

// PrepareInterchainMessage implements IInterchainContract
func (c *RealEstateContract) PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error) {
	var property PropertyData
	if err := json.Unmarshal(data, &property); err != nil {
		return nil, errors.Wrap(errors.ErrInvalidRequest, "failed to unmarshal property data")
	}

	// Add chain-specific data based on target chain
	switch targetChain {
	case "finance":
		return c.prepareFinanceMessage(property)
	case "government":
		return c.prepareGovernmentMessage(property)
	case "insurance":
		return c.prepareInsuranceMessage(property)
	default:
		return nil, fmt.Errorf("unsupported target chain: %s", targetChain)
	}
}

// HandleCallback implements IInterchainContract
func (c *RealEstateContract) HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error {
	// Process callback responses from other chains
	switch sourceChain {
	case "finance":
		return c.handleFinanceCallback(ctx, response)
	case "government":
		return c.handleGovernmentCallback(ctx, response)
	case "insurance":
		return c.handleInsuranceCallback(ctx, response)
	default:
		return fmt.Errorf("unsupported source chain for callback: %s", sourceChain)
	}
}

// Internal handlers for chain-specific messages
func (c *RealEstateContract) handleFinanceChainMessage(ctx sdk.Context, property PropertyData) error {
	// Handle property financing updates
	return nil
}

func (c *RealEstateContract) handleGovernmentChainMessage(ctx sdk.Context, property PropertyData) error {
	// Handle property registration and regulatory updates
	return nil
}

func (c *RealEstateContract) handleInsuranceChainMessage(ctx sdk.Context, property PropertyData) error {
	// Handle property insurance updates
	return nil
}

// Internal message preparation for different chains
func (c *RealEstateContract) prepareFinanceMessage(property PropertyData) ([]byte, error) {
	// Prepare message for finance chain (mortgage, payments)
	return json.Marshal(property)
}

func (c *RealEstateContract) prepareGovernmentMessage(property PropertyData) ([]byte, error) {
	// Prepare message for government chain (registration, taxes)
	return json.Marshal(property)
}

func (c *RealEstateContract) prepareInsuranceMessage(property PropertyData) ([]byte, error) {
	// Prepare message for insurance chain (property insurance)
	return json.Marshal(property)
}

// Internal callback handlers
func (c *RealEstateContract) handleFinanceCallback(ctx sdk.Context, response []byte) error {
	// Handle finance chain responses (mortgage approval, payment confirmation)
	return nil
}

func (c *RealEstateContract) handleGovernmentCallback(ctx sdk.Context, response []byte) error {
	// Handle government chain responses (registration confirmation, tax assessment)
	return nil
}

func (c *RealEstateContract) handleInsuranceCallback(ctx sdk.Context, response []byte) error {
	// Handle insurance chain responses (policy updates, claim processing)
	return nil
}
