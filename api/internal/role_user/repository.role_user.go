package role_user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(roleUser entity.RoleUser) (entity.RoleUser, error)
	FindAll() ([]entity.RoleUser, error)
	FindOne(ID uuid.UUID) (entity.RoleUser, error)
	Update(roleUser entity.RoleUser) (entity.RoleUser, error)
	Delete(roleUser entity.RoleUser) (entity.RoleUser, error)
	FindCode(code string) (entity.RoleUser, error)
}

type repository struct {
	db *gorm.DB
}

func RoleUserRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(roleUser entity.RoleUser) (entity.RoleUser, error) {
	err := r.db.Create(&roleUser).Error

	if err != nil {
		return roleUser, err
	}

	return roleUser, err
}

func (r *repository) FindAll() ([]entity.RoleUser, error) {
	var roleUsers []entity.RoleUser
	err := r.db.Find(&roleUsers).Error
	if err != nil {
		return roleUsers, err
	}
	return roleUsers, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.RoleUser, error) {
	var roleUser entity.RoleUser
	err := r.db.Where("id=?", ID).Find(&roleUser).Error
	if err != nil {
		return roleUser, err
	}
	return roleUser, nil
}

func (r *repository) Update(roleUser entity.RoleUser) (entity.RoleUser, error) {
	err := r.db.Save(&roleUser).Error

	if err != nil {
		return roleUser, err
	}

	return roleUser, nil
}

func (r *repository) Delete(roleUser entity.RoleUser) (entity.RoleUser, error) {
	err := r.db.Delete(&roleUser)
	if err != nil {
		return roleUser, err.Error
	}
	return roleUser, nil
}

func (r *repository) FindCode(code string) (entity.RoleUser, error) {
	var roleUser entity.RoleUser
	err := r.db.Where("code=?", code).Find(&roleUser).Error
	if err != nil {
		return roleUser, err
	}
	return roleUser, nil
}
