package payment_method

import (
	"github.com/google/uuid"
)

type PaymentMethodParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type PaymentMethodInput struct {
	Name      string `json:"name" binding:"required"`
	Code      string `json:"code" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
