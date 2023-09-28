package entity

import (
	"gostartup/config/database"

	"github.com/google/uuid"
)

type Customer struct {
	database.Base
	Nik       string    `gorm:"type:varchar(50);unique" json:"nik"`
	Name      string    `gorm:"type:varchar(50)" json:"name"`
	Address   string    `gorm:"type:text" json:"address"`
	Work      string    `gorm:"type:varchar(50)" json:"work"`
	Handphone string    `gorm:"type:varchar(50);unique" json:"handphone"`
	UserID    uuid.UUID `gorm:"type:char(36);null" json:"user_id"`

	User User `gorm:"foreignKey:UserID;references:ID"`
}
