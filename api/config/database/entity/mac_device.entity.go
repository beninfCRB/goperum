package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MacDevice struct {
	ID         uuid.UUID `gorm:"primaryKey;type:char(36);default:(UUID())" json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	UserId     uuid.UUID `gorm:"type:varchar(50)" json:"user_id"`
	MacAddress string    `gorm:"type:text" json:"mac_address"`
	IsActive   bool      `gorm:"default:false" json:"is_active"`
}

func (u *MacDevice) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
