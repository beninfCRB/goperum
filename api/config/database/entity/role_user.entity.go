package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RoleUser struct {
	ID        uuid.UUID      `gorm:"primaryKey;type:char(36);default:(UUID())" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index;softDelete:true"`
	Code      string         `gorm:"type:varchar(50)" json:"code"`
	Name      string         `gorm:"type:varchar(50)" json:"name"`
}

func (u *RoleUser) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
