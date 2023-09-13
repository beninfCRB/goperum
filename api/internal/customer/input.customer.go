package customer

import (
	"github.com/google/uuid"
)

type CustomerParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type CustomerInput struct {
	Nik       string `json:"nik" binding:"required"`
	Name      string `json:"name" binding:"required"`
	Address   string `json:"address" binding:"required"`
	Work      string `json:"work" binding:"required"`
	Handphone string `json:"handphone" binding:"required"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
