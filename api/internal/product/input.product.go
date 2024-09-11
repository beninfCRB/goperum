package product

import (
	"mime/multipart"

	"github.com/google/uuid"
)

type ProductParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type ProductInput struct {
	Name        string                `form:"name" binding:"required"`
	Model       string                `form:"model" binding:"required"`
	Type        string                `form:"type" binding:"required"`
	Blok        string                `form:"blok" binding:"required"`
	Kavling     string                `form:"kavling" binding:"required"`
	Sertifikat  string                `form:"sertifikat" binding:"required"`
	Price       float64               `form:"price" binding:"required"`
	Description string                `form:"description" binding:"required"`
	Stock       float64               `form:"stock" binding:"required"`
	Image       *multipart.FileHeader `form:"image" binding:"required"`
	CreatedBy   uuid.UUID
	UpdatedBy   uuid.UUID
}
