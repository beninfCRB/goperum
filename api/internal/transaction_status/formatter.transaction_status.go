package transaction_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type transactionStatusFormat struct {
	ID         uuid.UUID   `json:"id"`
	Code       string      `json:"code"`
	Name       string      `json:"name"`
	RoleUserID uuid.UUID   `json:"role_user_id"`
	RoleUser   interface{} `json:"role_user"`
}

func TransactionStatusFormat(transactionStatus entity.TransactionStatus) transactionStatusFormat {
	formatter := transactionStatusFormat{
		ID:         transactionStatus.ID,
		Code:       transactionStatus.Code,
		Name:       transactionStatus.Name,
		RoleUserID: transactionStatus.RoleUserID,
		RoleUser:   transactionStatus.RoleUser,
	}
	return formatter
}
