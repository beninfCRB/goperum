package bank

import (
	"github.com/google/uuid"
)

type BankParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type BankInput struct {
	Name      string `json:"name" binding:"required"`
	Code      string `json:"code" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
