package marketing

import (
	"github.com/google/uuid"
)

type MarketingParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type MarketingInput struct {
	Nik       string `json:"nik" binding:"required"`
	Name      string `json:"name" binding:"required"`
	Address   string `json:"address" binding:"required"`
	Work      string `json:"work" binding:"required"`
	Handphone string `json:"handphone" binding:"required"`
	UserID    uuid.UUID
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
}
