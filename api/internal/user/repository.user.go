package user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Save(user entity.User) (entity.User, error)
	FindByEmail(email string) (entity.User, error)
	FindByID(ID uuid.UUID) (entity.User, error)
	Update(user entity.User) (entity.User, error)
	FindByRefresToken(refreshToken string) (entity.User, error)
	FindVerificationCode(code string) (entity.User, error)
}

type repository struct {
	db *gorm.DB
}

func UserRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(user entity.User) (entity.User, error) {
	err := r.db.Create(&user).Error

	if err != nil {
		return user, err
	}

	return user, err
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

func (r *repository) Update(user entity.User) (entity.User, error) {
	err := r.db.Save(&user).Error

	if err != nil {
		return user, err
	}

	return user, nil
}

func (r *repository) FindByRefresToken(refreshToken string) (entity.User, error) {
	var user entity.User
	err := r.db.Where("refresh_token=?", refreshToken).Find(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}

func (r *repository) FindVerificationCode(code string) (entity.User, error) {
	var user entity.User
	err := r.db.Where("verification_code=?", code).Find(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}
