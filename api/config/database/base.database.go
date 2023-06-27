package database

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Base struct {
	ID        uuid.UUID      `gorm:"primaryKey;type:char(36);default:(UUID())" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index;softDelete:true"`
	CreatedBy uuid.UUID      `gorm:"type:char(36)" json:"created_by"`
	UpdatedBy uuid.UUID      `gorm:"type:char(36)" json:"updated_by"`
}

func (u *Base) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
