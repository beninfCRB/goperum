package bank

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type bankFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func BankFormat(bank entity.Bank) bankFormat {
	formatter := bankFormat{
		ID:   bank.ID,
		Code: bank.Code,
		Name: bank.Name,
	}
	return formatter
}
