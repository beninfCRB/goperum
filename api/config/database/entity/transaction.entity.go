package entity

import (
	"gostartup/config/database"

	"github.com/google/uuid"
)

type Transaction struct {
	database.Base
	Code                 string    `gorm:"type:varchar(50)" json:"code"`
	CustomerID           uuid.UUID `gorm:"type:varchar(36)" json:"customer_id"`
	MarketingID          uuid.UUID `gorm:"type:varchar(36)" json:"marketing_id"`
	ProductID            uuid.UUID `gorm:"type:varchar(36)" json:"product_id"`
	PurchaseMethodID     uuid.UUID `gorm:"type:varchar(36)" json:"purchase_method_id"`
	DownPayment          uint64    `gorm:"type:bigint(12)" json:"down_payment"`
	TypeDownPaymentID    uuid.UUID `gorm:"type:varchar(36)" json:"type_down_payment_id"`
	LengthInstallmentDP  uint64    `gorm:"type:bigint(12)" json:"length_installments_dp"`
	MonthlyInstallmentDP uint64    `gorm:"type:bigint(12)" json:"monthly_installments_dp"`
	Principal            uint64    `gorm:"type:bigint(12)" json:"principal"`
	LengthPrincipal      uint64    `gorm:"type:bigint(12)" json:"length_principal"`
	MonthlyPrincipal     uint64    `gorm:"type:bigint(12)" json:"monthly_principal"`
	TotalBill            uint64    `gorm:"type:bigint(12)" json:"total_bill"`

	Customer        Customer        `gorm:"foreignKey:CustomerID;references:ID"`
	Marketing       Marketing       `gorm:"foreignKey:MarketingID;references:ID"`
	Product         Product         `gorm:"foreignKey:ProductID;references:ID"`
	TypeDownPayment TypeDownPayment `gorm:"foreignKey:TypeDownPaymentID;references:ID"`
	PurchaseMethod  PurchaseMethod  `gorm:"foreignKey:PurchaseMethodID;references:ID"`
}
