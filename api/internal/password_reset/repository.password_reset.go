package password_reset

import (
	"gostartup/config/database/entity"

	"gorm.io/gorm"
)

type Respository interface {
	Save(password_reset entity.PasswordReset) (entity.PasswordReset, error)
	FindByCode(code string) (entity.PasswordReset, error)
}

type repository struct {
	db *gorm.DB
}

func PasswordResetRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(password_reset entity.PasswordReset) (entity.PasswordReset, error) {
	err := r.db.Create(&password_reset).Error

	if err != nil {
		return password_reset, err
	}

	return password_reset, err
}

func (r *repository) FindByCode(code string) (entity.PasswordReset, error) {
	var password entity.PasswordReset
	err := r.db.Where("reset_code=?", code).Find(&password).Error
	if err != nil {
		return password, err
	}
	return password, nil
}
