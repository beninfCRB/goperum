package marketing

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type marketingFormat struct {
	ID        uuid.UUID   `json:"id"`
	Nik       string      `json:"nik"`
	Name      string      `json:"name"`
	Address   string      `json:"address"`
	Work      string      `json:"work"`
	Handphone string      `json:"handphone"`
	User      interface{} `json:"user"`
}

func MarketingFormat(marketing entity.Marketing) marketingFormat {
	formatter := marketingFormat{
		ID:        marketing.ID,
		Nik:       marketing.Nik,
		Name:      marketing.Name,
		Address:   marketing.Address,
		Work:      marketing.Work,
		Handphone: marketing.Handphone,
		User:      marketing.User,
	}
	return formatter
}
