package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Password_reset struct {
	ID        uuid.UUID `gorm:"primaryKey;type:char(36);default:(UUID())" json:"id"`
	Email     string    `gorm:"type:varchar(50)" json:"email"`
	ResetCode string    `gorm:"type:text" json:"reset_code"`
	CreatedAt time.Time `json:"created_at"`
}

func (u *Password_reset) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
