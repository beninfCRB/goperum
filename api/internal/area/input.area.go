package area

import (
	"github.com/google/uuid"
)

type AreaParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type AreaInput struct {
	Blok       string `json:"blok" binding:"required"`
	Kavling    string `json:"kavling" binding:"required"`
	Sertifikat string `json:"sertifikat" binding:"required"`
	CreatedBy  uuid.UUID
	UpdatedBy  uuid.UUID
}
