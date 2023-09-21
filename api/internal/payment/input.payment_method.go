package payment

import (
	"time"

	"github.com/google/uuid"
)

type PaymentParamId struct {
	ID uuid.UUID `uri:"id" binding:"required"`
}

type PaymentInput struct {
	Code              string    `json:"code" binding:"required"`
	ConfirmDate       time.Time `json:"confirm_date" binding:"required"`
	TransactionID     uuid.UUID `json:"transaction" binding:"required"`
	TotalPayment      uint64    `json:"total_payment" binding:"required"`
	Information       string    `json:"information" binding:"required"`
	ApprovalStatusID  uuid.UUID `json:"approval_status" binding:"required"`
	PaymentMethodID   uuid.UUID `json:"payment_method" binding:"required"`
	BankID            uuid.UUID `json:"bank" binding:"required"`
	AccountName       string    `json:"account_name" binding:"required"`
	AccountNumber     string    `json:"account_number" binding:"required"`
	AccountReceivable string    `json:"account_receivable" binding:"required"`
	ProfPayment       string    `json:"prof_payment"`
	CreatedBy         uuid.UUID
	UpdatedBy         uuid.UUID
}
