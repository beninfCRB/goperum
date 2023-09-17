package role_user

import (
	"github.com/google/uuid"
)

type RoleUserParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type RoleUserInput struct {
	Code      string `json:"code" binding:"required"`
	Name      string `json:"name" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}

type RoleUserCodeInput struct {
	Code string `json:"code" binding:"required"`
}
