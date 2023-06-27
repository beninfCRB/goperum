package area

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type areaFormat struct {
	ID         uuid.UUID `json:"id"`
	Blok       string    `json:"blok"`
	Kavling    string    `json:"kavling"`
	Sertifikat string    `json:"sertifikat"`
}

func AreaFormat(area entity.Area) areaFormat {
	formatter := areaFormat{
		ID:         area.ID,
		Blok:       area.Blok,
		Kavling:    area.Kavling,
		Sertifikat: area.Sertifikat,
	}
	return formatter
}
