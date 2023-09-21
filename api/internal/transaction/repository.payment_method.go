package transaction

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(transaction entity.Transaction) (entity.Transaction, error)
	FindAll() ([]entity.Transaction, error)
	FindOne(ID uuid.UUID) (entity.Transaction, error)
	Update(transaction entity.Transaction) (entity.Transaction, error)
	Delete(transaction entity.Transaction) (entity.Transaction, error)
}

type repository struct {
	db *gorm.DB
}

func TransactionRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(transaction entity.Transaction) (entity.Transaction, error) {
	err := r.db.Create(&transaction).Error

	if err != nil {
		return transaction, err
	}

	return transaction, err
}

func (r *repository) FindAll() ([]entity.Transaction, error) {
	var transactions []entity.Transaction
	err := r.db.Find(&transactions).Error
	if err != nil {
		return transactions, err
	}
	return transactions, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Transaction, error) {
	var transaction entity.Transaction
	err := r.db.Where("id=?", ID).Find(&transaction).Error
	if err != nil {
		return transaction, err
	}
	return transaction, nil
}

func (r *repository) Update(transaction entity.Transaction) (entity.Transaction, error) {
	err := r.db.Save(&transaction).Error

	if err != nil {
		return transaction, err
	}

	return transaction, nil
}

func (r *repository) Delete(transaction entity.Transaction) (entity.Transaction, error) {
	err := r.db.Delete(&transaction)
	if err != nil {
		return transaction, err.Error
	}
	return transaction, nil
}
