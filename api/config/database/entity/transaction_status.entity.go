package entity

import (
	"gostartup/config/database"

	"github.com/google/uuid"
)

type ApprovalStatus struct {
	database.Base
	Code       string    `gorm:"type:varchar(50)" json:"code"`
	Name       string    `gorm:"type:varchar(50)" json:"name"`
	RoleUserID uuid.UUID `gorm:"type:varchar(36)" json:"user_role"`

	RoleUser RoleUser `gorm:"foreignKey:RoleUserID;references:ID"`
}
