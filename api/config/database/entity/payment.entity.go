package entity

import (
	"gostartup/config/database"
	"time"

	"github.com/google/uuid"
)

type Payment struct {
	database.Base
	Code              string    `gorm:"type:varchar(50)" json:"code"`
	ConfirmDate       time.Time `json:"confirm_date"`
	TransactionID     uuid.UUID `gorm:"type:varchar(36)" json:"transaction_id"`
	TotalPayment      uint64    `gorm:"type:float(12)" json:"total_payment"`
	Information       string    `gorm:"type:text" json:"information"`
	ApprovalStatusID  uuid.UUID `gorm:"type:varchar(36)" json:"approval_status_id"`
	PaymentMethodID   uuid.UUID `gorm:"type:varchar(36)" json:"payment_method_id"`
	BankID            uuid.UUID `gorm:"type:varchar(36)" json:"bank_id"`
	AccountName       string    `gorm:"type:varchar(50)" json:"account_name"`
	AccountNumber     string    `gorm:"type:varchar(50)" json:"account_number"`
	AccountReceivable string    `gorm:"type:varchar(50)" json:"account_receivable"`
	ProfPayment       string    `gorm:"type:varchar(50)" json:"prof_payment"`

	Transaction    Transaction    `gorm:"foreignKey:TransactionID;references:ID"`
	ApprovalStatus ApprovalStatus `gorm:"foreignKey:ApprovalStatusID;references:ID"`
	PaymentMethod  PaymentMethod  `gorm:"foreignKey:PaymentMethodID;references:ID"`
	Bank           Bank           `gorm:"foreignKey:BankID;references:ID"`
}
