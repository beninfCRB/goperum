package product_image

import (
	"mime/multipart"

	"github.com/google/uuid"
)

type ProductImageInput struct {
	Path      *multipart.FileHeader `json:"path" binding:"required"`
	ProductID uuid.UUID             `json:"product_id" binding:"required"`
}
