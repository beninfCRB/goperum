package payment

import (
	"gostartup/config/database/entity"
	"time"

	"github.com/google/uuid"
)

type paymentFormat struct {
	ID                uuid.UUID             `json:"id"`
	Code              string                `json:"code"`
	ConfirmDate       time.Time             `json:"confirm_date"`
	Transaction       entity.Transaction    `json:"transaction"`
	TotalPayment      uint64                `json:"total_payment"`
	Information       string                `json:"information"`
	ApprovalStatus    entity.ApprovalStatus `json:"approval_status"`
	PaymentMethod     entity.PaymentMethod  `json:"payment_method"`
	Bank              entity.Bank           `json:"bank"`
	AccountName       string                `json:"account_name"`
	AccountNumber     string                `json:"account_number"`
	AccountReceivable string                `json:"account_receivable"`
	ProfPayment       string                `json:"prof_payment"`
}

func PaymentFormat(payment entity.Payment) paymentFormat {
	formatter := paymentFormat{
		ID:                payment.ID,
		Code:              payment.Code,
		ConfirmDate:       payment.ConfirmDate,
		Transaction:       payment.Transaction,
		TotalPayment:      payment.TotalPayment,
		Information:       payment.Information,
		ApprovalStatus:    payment.ApprovalStatus,
		PaymentMethod:     payment.PaymentMethod,
		Bank:              payment.Bank,
		AccountName:       payment.AccountName,
		AccountNumber:     payment.AccountNumber,
		AccountReceivable: payment.AccountReceivable,
		ProfPayment:       payment.ProfPayment,
	}
	return formatter
}
