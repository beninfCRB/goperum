package purchase_method

import (
	"github.com/google/uuid"
)

type PurchaseMethodParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type PurchaseMethodInput struct {
	Name      string `json:"name" binding:"required"`
	Code      string `json:"code" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
