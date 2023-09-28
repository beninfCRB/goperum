package password_reset

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

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

func (r *repository) Save(passwordReset entity.PasswordReset) (entity.PasswordReset, error) {
	passwordReset.ID = util.UUID()
	err := r.db.Create(&passwordReset).Error

	if err != nil {
		return passwordReset, err
	}

	return passwordReset, err
}

func (r *repository) FindByCode(code string) (entity.PasswordReset, error) {
	var password entity.PasswordReset
	err := r.db.Where("reset_code=?", code).Find(&password).Error
	if err != nil {
		return password, err
	}
	return password, nil
}
