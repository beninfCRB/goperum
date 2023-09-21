package type_down_payment

import (
	"github.com/google/uuid"
)

type TypeDownPaymentParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type TypeDownPaymentInput struct {
	Name      string `json:"name" binding:"required"`
	Code      string `json:"code" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
