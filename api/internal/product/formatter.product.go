package product

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type productFormat struct {
	ID         uuid.UUID `json:"id"`
	Blok       string    `json:"blok"`
	Kavling    string    `json:"kavling"`
	Sertifikat string    `json:"sertifikat"`
}

func ProductFormat(product entity.Product) productFormat {
	formatter := productFormat{
		ID:         product.ID,
		Blok:       product.Blok,
		Kavling:    product.Kavling,
		Sertifikat: product.Sertifikat,
	}
	return formatter
}
