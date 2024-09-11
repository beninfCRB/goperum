package entity

import "gostartup/config/database"

type Product struct {
	database.Base
	Name        string  `gorm:"type:varchar(50)" json:"name"`
	Model       string  `gorm:"type:varchar(50)" json:"model"`
	Type        string  `gorm:"type:varchar(50)" json:"type"`
	Blok        string  `gorm:"type:varchar(50)" json:"blok"`
	Kavling     string  `gorm:"type:varchar(50)" json:"kavling"`
	Sertifikat  string  `gorm:"type:varchar(50);unique" json:"sertifikat"`
	Price       float64 `gorm:"type:float(12)" json:"price"`
	Description string  `gorm:"type:text" json:"description"`
	Stock       float64 `gorm:"type:float(12)" json:"stock"`
	Image       string  `gorm:"type:text" json:"image"`
}
