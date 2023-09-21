package transaction_status

import (
	"github.com/google/uuid"
)

type TransactionStatusParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type TransactionStatusInput struct {
	Name       string `json:"name" binding:"required"`
	Code       string `json:"code" binding:"required"`
	RoleUserID uuid.UUID
	CreatedBy  uuid.UUID
	UpdatedBy  uuid.UUID
}
