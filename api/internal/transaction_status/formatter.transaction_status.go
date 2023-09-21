package transaction_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type transactionStatusFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func TransactionStatusFormat(transactionStatus entity.TransactionStatus) transactionStatusFormat {
	formatter := transactionStatusFormat{
		ID:   transactionStatus.ID,
		Code: transactionStatus.Code,
		Name: transactionStatus.Name,
	}
	return formatter
}
