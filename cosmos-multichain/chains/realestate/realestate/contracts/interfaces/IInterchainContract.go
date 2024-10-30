package interfaces

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IInterchainContract defines the base interface for cross-chain communication
type IInterchainContract interface {
	// ValidateInterchainData validates data coming from other chains
	ValidateInterchainData(ctx sdk.Context, data []byte) error

	// ProcessInterchainMessage processes messages from other chains
	ProcessInterchainMessage(ctx sdk.Context, sourceChain string, message []byte) error

	// PrepareInterchainMessage prepares a message to be sent to another chain
	PrepareInterchainMessage(ctx sdk.Context, targetChain string, data []byte) ([]byte, error)

	// HandleCallback handles callbacks from other chains after cross-chain transactions
	HandleCallback(ctx sdk.Context, sourceChain string, response []byte) error
}

// IDataValidator defines the interface for data validation
type IDataValidator interface {
	// ValidateData validates the data structure and content
	ValidateData(data []byte) error

	// ValidateSignature validates the signature of the data
	ValidateSignature(data []byte, signature []byte, pubKey []byte) error
}
