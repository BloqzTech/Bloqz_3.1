package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IEcommerceContract extends the base interchain contract with e-commerce features
type IEcommerceContract interface {
	// Base interchain functionality
	ValidateInterchainData(ctx sdk.Context, data []byte) error
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error

	// E-commerce specific functionality
	ProcessOrder(ctx sdk.Context, order []byte) error
	UpdateInventory(ctx sdk.Context, productID string, quantity int64) error
	ValidateProduct(ctx sdk.Context, product []byte) error
	ProcessPayment(ctx sdk.Context, payment []byte) error
}

// IProductManager defines the interface for product management
type IProductManager interface {
	// AddProduct adds a new product to the catalog
	AddProduct(ctx sdk.Context, product []byte) error

	// UpdateProduct updates an existing product
	UpdateProduct(ctx sdk.Context, product []byte) error

	// DeleteProduct removes a product from the catalog
	DeleteProduct(ctx sdk.Context, productID string) error

	// GetProduct retrieves product information
	GetProduct(ctx sdk.Context, productID string) ([]byte, error)

	// UpdateInventory updates product inventory
	UpdateInventory(ctx sdk.Context, productID string, quantity int64) error
}

// IOrderProcessor defines the interface for order processing
type IOrderProcessor interface {
	// ValidateOrder validates order details
	ValidateOrder(ctx sdk.Context, order []byte) error

	// ProcessOrder processes a new order
	ProcessOrder(ctx sdk.Context, order []byte) error

	// UpdateOrderStatus updates the status of an order
	UpdateOrderStatus(ctx sdk.Context, orderID string, status string) error

	// CancelOrder cancels an existing order
	CancelOrder(ctx sdk.Context, orderID string) error
}

// IShippingManager defines the interface for shipping management
type IShippingManager interface {
	// CreateShipment creates a new shipment
	CreateShipment(ctx sdk.Context, orderID string, shippingDetails []byte) error

	// UpdateShipmentStatus updates shipment status
	UpdateShipmentStatus(ctx sdk.Context, shipmentID string, status string) error

	// TrackShipment retrieves shipment tracking information
	TrackShipment(ctx sdk.Context, shipmentID string) ([]byte, error)

	// CalculateShipping calculates shipping costs
	CalculateShipping(ctx sdk.Context, orderID string, destination string) (sdk.Int, error)
}
