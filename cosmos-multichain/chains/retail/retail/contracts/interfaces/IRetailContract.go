package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IRetailContract extends the base interchain contract with retail features
type IRetailContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// Retail-specific functionality
	ProcessSale(ctx sdk.Context, sale []byte) error
	UpdateInventory(ctx sdk.Context, inventory []byte) error
	ProcessReturn(ctx sdk.Context, returnData []byte) error
	UpdateLoyaltyPoints(ctx sdk.Context, customerID string, points sdk.Int) error
}

// IInventoryManager defines the interface for inventory management
type IInventoryManager interface {
	// UpdateInventory updates product inventory
	UpdateInventory(ctx sdk.Context, inventory []byte) error

	// CheckStock checks product availability
	CheckStock(ctx sdk.Context, productID string) (int64, error)

	// ReserveStock reserves product stock
	ReserveStock(ctx sdk.Context, productID string, quantity int64) error

	// ReleaseStock releases reserved stock
	ReleaseStock(ctx sdk.Context, productID string, quantity int64) error
}

// ISalesProcessor defines the interface for sales processing
type ISalesProcessor interface {
	// ProcessSale processes a retail sale
	ProcessSale(ctx sdk.Context, sale []byte) error

	// ProcessReturn processes a product return
	ProcessReturn(ctx sdk.Context, returnData []byte) error

	// ValidateSale validates sale details
	ValidateSale(ctx sdk.Context, sale []byte) error

	// CalculateTotal calculates sale total with discounts
	CalculateTotal(ctx sdk.Context, items []byte) (sdk.Int, error)
}

// ILoyaltyManager defines the interface for loyalty program management
type ILoyaltyManager interface {
	// UpdatePoints updates customer loyalty points
	UpdatePoints(ctx sdk.Context, customerID string, points sdk.Int) error

	// GetPoints retrieves customer points balance
	GetPoints(ctx sdk.Context, customerID string) (sdk.Int, error)

	// ProcessReward processes loyalty reward redemption
	ProcessReward(ctx sdk.Context, reward []byte) error

	// ValidateReward validates reward redemption
	ValidateReward(ctx sdk.Context, reward []byte) error
}

// IPromotionManager defines the interface for promotion management
type IPromotionManager interface {
	// CreatePromotion creates a new promotion
	CreatePromotion(ctx sdk.Context, promotion []byte) error

	// UpdatePromotion updates an existing promotion
	UpdatePromotion(ctx sdk.Context, promotion []byte) error

	// ValidatePromotion validates promotion details
	ValidatePromotion(ctx sdk.Context, promotion []byte) error

	// ApplyPromotion applies promotion to sale
	ApplyPromotion(ctx sdk.Context, saleID string, promotionID string) error
}
