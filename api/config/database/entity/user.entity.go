package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID                  uuid.UUID      `gorm:"primaryKey;type:char(36);default:(UUID())" json:"id"`
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           time.Time      `json:"updated_at"`
	DeletedAt           gorm.DeletedAt `gorm:"index;softDelete:true"`
	Name                string         `gorm:"type:varchar(50)" json:"name"`
	Email               string         `gorm:"type:varchar(50);unique" json:"email"`
	PasswordHash        string         `gorm:"type:text" json:"password"`
	ConfirmPasswordHash string         `gorm:"type:text" json:"confirm_password"`
	AvatarFileName      string         `gorm:"type:text" json:"avatar"`
	RefreshToken        string         `gorm:"type:text" json:"refresh_token"`
	Role                string         `gorm:"type:varchar(10)" json:"role"`
	IsVerify            bool           `gorm:"default:false" json:"is_verify"`

	MacDevice []MacDevice `gorm:"foreignKey:UserId;references:ID"`

	CreatedCustomer []Customer `gorm:"foreignKey:CreatedBy;references:ID"`
	UpdatedCustomer []Customer `gorm:"foreignKey:UpdatedBy;references:ID"`

	CreatedArea []Area `gorm:"foreignKey:CreatedBy;references:ID"`
	UpdatedArea []Area `gorm:"foreignKey:UpdatedBy;references:ID"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
