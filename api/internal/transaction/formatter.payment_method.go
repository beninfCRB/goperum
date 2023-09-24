package transaction

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type transactionFormat struct {
	ID                   uuid.UUID   `json:"id"`
	Code                 string      `json:"code"`
	Customer             interface{} `json:"customer"`
	Marketing            interface{} `json:"marketing"`
	Product              interface{} `json:"product"`
	PurchaseMethod       interface{} `json:"purchase_method"`
	DownPayment          uint64      `json:"down_payment"`
	TypeDownPayment      interface{} `json:"type_down_payment"`
	LengthInstallmentDP  uint64      `json:"length_installments_dp"`
	MonthlyInstallmentDP uint64      `json:"monthly_installments_dp"`
	Principal            uint64      `json:"principal"`
	LengthPrincipal      uint64      `json:"length_principal"`
	MonthlyPrincipal     uint64      `json:"monthly_principal"`
	TotalBill            uint64      `json:"total_bill"`
}

func TransactionFormat(transaction entity.Transaction) transactionFormat {
	formatter := transactionFormat{
		ID:                   transaction.ID,
		Code:                 transaction.Code,
		Customer:             transaction.Customer,
		Marketing:            transaction.Marketing,
		Product:              transaction.Product,
		PurchaseMethod:       transaction.PurchaseMethod,
		DownPayment:          transaction.DownPayment,
		TypeDownPayment:      transaction.TypeDownPayment,
		LengthInstallmentDP:  transaction.LengthInstallmentDP,
		MonthlyInstallmentDP: transaction.MonthlyInstallmentDP,
		Principal:            transaction.Principal,
		LengthPrincipal:      transaction.LengthPrincipal,
		MonthlyPrincipal:     transaction.MonthlyPrincipal,
		TotalBill:            transaction.TotalBill,
	}
	return formatter
}
