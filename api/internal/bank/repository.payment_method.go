package bank

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(bank entity.Bank) (entity.Bank, error)
	FindAll() ([]entity.Bank, error)
	FindOne(ID uuid.UUID) (entity.Bank, error)
	Update(bank entity.Bank) (entity.Bank, error)
	Delete(bank entity.Bank) (entity.Bank, error)
}

type repository struct {
	db *gorm.DB
}

func BankRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(bank entity.Bank) (entity.Bank, error) {
	err := r.db.Create(&bank).Error

	if err != nil {
		return bank, err
	}

	return bank, err
}

func (r *repository) FindAll() ([]entity.Bank, error) {
	var banks []entity.Bank
	err := r.db.Find(&banks).Error
	if err != nil {
		return banks, err
	}
	return banks, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Bank, error) {
	var bank entity.Bank
	err := r.db.Where("id=?", ID).Find(&bank).Error
	if err != nil {
		return bank, err
	}
	return bank, nil
}

func (r *repository) Update(bank entity.Bank) (entity.Bank, error) {
	err := r.db.Save(&bank).Error

	if err != nil {
		return bank, err
	}

	return bank, nil
}

func (r *repository) Delete(bank entity.Bank) (entity.Bank, error) {
	err := r.db.Delete(&bank)
	if err != nil {
		return bank, err.Error
	}
	return bank, nil
}
