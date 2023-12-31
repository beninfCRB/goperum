package customer

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type customerFormat struct {
	ID        uuid.UUID   `json:"id"`
	Nik       string      `json:"nik"`
	Name      string      `json:"name"`
	Address   string      `json:"address"`
	Work      string      `json:"work"`
	Handphone string      `json:"handphone"`
	User      interface{} `json:"user"`
}

func CustomerFormat(customer entity.Customer) customerFormat {
	formatter := customerFormat{
		ID:        customer.ID,
		Nik:       customer.Nik,
		Name:      customer.Name,
		Address:   customer.Address,
		Work:      customer.Work,
		Handphone: customer.Handphone,
		User:      customer.User,
	}
	return formatter
}
