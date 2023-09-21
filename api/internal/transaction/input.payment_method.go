package transaction

import (
	"github.com/google/uuid"
)

type TransactionParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type TransactionInput struct {
	Code                 string    `json:"code" binding:"required"`
	CustomerID           uuid.UUID `json:"customer_id" binding:"required"`
	MarketingID          uuid.UUID `json:"marketing_id" binding:"required"`
	ProductID            uuid.UUID `json:"product_id" binding:"required"`
	PurchaseMethodID     uuid.UUID `json:"purchase_method_id" binding:"required"`
	DownPayment          uint64    `json:"down_payment" binding:"required"`
	TypeDownPaymentID    uuid.UUID `json:"type_down_payment_id" binding:"required"`
	LengthInstallmentDP  uint64    `json:"length_installments_dp" binding:"required"`
	MonthlyInstallmentDP uint64    `json:"monthly_installments_dp" binding:"required"`
	Principal            uint64    `json:"principal" binding:"required"`
	LengthPrincipal      uint64    `json:"length_principal" binding:"required"`
	MonthlyPrincipal     uint64    `json:"monthly_principal" binding:"required"`
	TotalBill            uint64    `json:"total_bill" binding:"required"`
	CreatedBy            uuid.UUID
	UpdatedBy            uuid.UUID
}
