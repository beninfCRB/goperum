package entity

import (
	"gostartup/config/database"
)

type PurchaseMethod struct {
	database.Base
	Code string `gorm:"type:varchar(50)" json:"code"`
	Name string `gorm:"type:varchar(50)" json:"name"`
}
