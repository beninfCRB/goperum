package entity

import "gostartup/config/database"

type Area struct {
	database.Base
	Blok       string `gorm:"type:varchar(50)" json:"blok"`
	Kavling    string `gorm:"type:varchar(50)" json:"kavling"`
	Sertifikat string `gorm:"type:varchar(50);unique" json:"sertifikat"`
}
