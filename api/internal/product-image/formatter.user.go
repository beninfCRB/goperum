package product_image

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type productImageFormat struct {
	ID        uuid.UUID `json:"id"`
	ProductID uuid.UUID `json:"product_id"`
	Path      string    `json:"path"`
}

func ProductImageFormat(productImage entity.ProductImage) productImageFormat {
	formatter := productImageFormat{
		ID:        productImage.ID,
		Path:      productImage.Path,
		ProductID: productImage.ProductID,
	}
	return formatter
}
