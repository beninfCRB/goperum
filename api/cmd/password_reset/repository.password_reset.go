package password_reset

import (
	"gostartup/config/database/entity"

	"gorm.io/gorm"
)

type Respository interface {
	Save(password_reset entity.Password_reset) (entity.Password_reset, error)
	FindByCode(code string) (entity.Password_reset, error)
}

type repository struct {
	db *gorm.DB
}

func PasswordResetRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(password_reset entity.Password_reset) (entity.Password_reset, error) {
	err := r.db.Create(&password_reset).Error

	if err != nil {
		return password_reset, err
	}

	return password_reset, err
}

func (r *repository) FindByCode(code string) (entity.Password_reset, error) {
	var password entity.Password_reset
	err := r.db.Where("reset_code=?", code).Find(&password).Error
	if err != nil {
		return password, err
	}
	return password, nil
}
