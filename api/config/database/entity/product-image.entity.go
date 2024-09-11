package entity

import (
	"gostartup/config/database"

	"github.com/google/uuid"
)

type ProductImage struct {
	database.Base
	ProductID uuid.UUID `gorm:"type:varchar(36)" json:"product_id"`
	Path      string    `gorm:"type:text" json:"image"`

	Product Product `gorm:"foreignKey:ProductID;references:ID"`
}
