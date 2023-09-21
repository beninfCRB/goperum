package payment_method

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type paymentMethodFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func PaymentMethodFormat(paymentMethod entity.PaymentMethod) paymentMethodFormat {
	formatter := paymentMethodFormat{
		ID:   paymentMethod.ID,
		Code: paymentMethod.Code,
		Name: paymentMethod.Name,
	}
	return formatter
}
