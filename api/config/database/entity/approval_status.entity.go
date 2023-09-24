package entity

import (
	"gostartup/config/database"

	"github.com/google/uuid"
)

type TransactionStatus struct {
	database.Base
	Code       string    `gorm:"type:varchar(50)" json:"code"`
	Name       string    `gorm:"type:varchar(50)" json:"name"`
	RoleUserID uuid.UUID `gorm:"type:varchar(36)" json:"role_user_id"`

	RoleUser RoleUser `gorm:"foreignKey:RoleUserID;references:ID"`
}
