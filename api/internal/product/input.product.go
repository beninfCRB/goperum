package product

import (
	"github.com/google/uuid"
)

type ProductParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type ProductInput struct {
	Name        string  `json:"name" binding:"required"`
	Model       string  `json:"model" binding:"required"`
	Type        string  `json:"type" binding:"required"`
	Blok        string  `json:"blok" binding:"required"`
	Kavling     string  `json:"kavling" binding:"required"`
	Sertifikat  string  `json:"sertifikat" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Stock       float64 `json:"stock" binding:"required"`
	CreatedBy   uuid.UUID
	UpdatedBy   uuid.UUID
}
