package verification_user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Save(password_reset entity.VerificationUser) (entity.VerificationUser, error)
	FindByCode(code string) (entity.VerificationUser, error)
	FindByEmail(email string) (entity.User, error)
	FindByID(ID uuid.UUID) (entity.User, error)
	UpdateUser(user entity.User) (entity.User, error)
}

type repository struct {
	db *gorm.DB
}

func VerificationUserRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(verification entity.VerificationUser) (entity.VerificationUser, error) {
	err := r.db.Create(&verification).Error

	if err != nil {
		return verification, err
	}

	return verification, err
}

func (r *repository) FindByCode(code string) (entity.VerificationUser, error) {
	var password entity.VerificationUser
	err := r.db.Where("verification_code=?", code).Find(&password).Error
	if err != nil {
		return password, err
	}
	return password, nil
}

func (r *repository) FindByEmail(email string) (entity.User, error) {
	var user entity.User
	err := r.db.Where("email=?", email).Find(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

func (r *repository) FindByID(ID uuid.UUID) (entity.User, error) {
	var user entity.User
	err := r.db.Where("id=?", ID).Find(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

func (r *repository) UpdateUser(user entity.User) (entity.User, error) {
	err := r.db.Save(&user).Error

	if err != nil {
		return user, err
	}

	return user, nil
}
