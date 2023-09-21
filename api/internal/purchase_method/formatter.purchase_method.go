package purchase_method

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type purchaseMethodFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func PurchaseMethodFormat(purchaseMethod entity.PurchaseMethod) purchaseMethodFormat {
	formatter := purchaseMethodFormat{
		ID:   purchaseMethod.ID,
		Code: purchaseMethod.Code,
		Name: purchaseMethod.Name,
	}
	return formatter
}
