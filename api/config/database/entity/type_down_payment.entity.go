package entity

import "gostartup/config/database"

type TypeDownPayment struct {
	database.Base
	Name string `gorm:"type:varchar(50)" json:"name"`
	Code string `gorm:"type:varchar(50)" json:"code"`
}
