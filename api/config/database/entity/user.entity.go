package entity

import (
	"gostartup/config/database"
)

type User struct {
	database.Base
	Name             string `gorm:"type:varchar(50)" json:"name"`
	Email            string `gorm:"type:varchar(50);unique" json:"email"`
	PasswordHash     string `gorm:"type:text" json:"password"`
	AvatarFileName   string `gorm:"type:text" json:"avatar"`
	RefreshToken     string `gorm:"type:text" json:"refresh_token"`
	Role             string `gorm:"type:varchar(10)" json:"role"`
	VerificationCode string `gorm:"type:varchar(20)" json:"verification_code"`

	CreatedCustomer []Customer `gorm:"foreignKey:CreatedBy;references:ID"`
	UpdatedCustomer []Customer `gorm:"foreignKey:UpdatedBy;references:ID"`

	CreatedArea []Area `gorm:"foreignKey:CreatedBy;references:ID"`
	UpdatedArea []Area `gorm:"foreignKey:UpdatedBy;references:ID"`
}
