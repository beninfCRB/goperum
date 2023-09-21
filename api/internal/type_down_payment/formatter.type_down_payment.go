package type_down_payment

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type typeDownPaymentFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func TypeDownPaymentFormat(typeDownPayment entity.TypeDownPayment) typeDownPaymentFormat {
	formatter := typeDownPaymentFormat{
		ID:   typeDownPayment.ID,
		Code: typeDownPayment.Code,
		Name: typeDownPayment.Name,
	}
	return formatter
}
