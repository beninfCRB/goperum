package entity

import (
	"gostartup/config/database"
)

type Bank struct {
	database.Base
	Code string `gorm:"type:varchar(50)" json:"code"`
	Name string `gorm:"type:varchar(50)" json:"name"`
}
