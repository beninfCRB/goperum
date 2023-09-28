package transaction_status

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Create(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error)
	FindAll() ([]entity.TransactionStatus, error)
	FindOne(ID uuid.UUID) (entity.TransactionStatus, error)
	Update(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error)
	Delete(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error)
}

type repository struct {
	db *gorm.DB
}

func TransactionStatusRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error) {
	transactionStatus.ID = util.UUID()
	err := r.db.Create(&transactionStatus).Error

	if err != nil {
		return transactionStatus, err
	}

	return transactionStatus, err
}

func (r *repository) FindAll() ([]entity.TransactionStatus, error) {
	var transactionStatuss []entity.TransactionStatus
	err := r.db.Preload(clause.Associations).Find(&transactionStatuss).Error
	if err != nil {
		return transactionStatuss, err
	}
	return transactionStatuss, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.TransactionStatus, error) {
	var transactionStatus entity.TransactionStatus
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&transactionStatus).Error
	if err != nil {
		return transactionStatus, err
	}
	return transactionStatus, nil
}

func (r *repository) Update(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error) {
	err := r.db.Updates(&transactionStatus).Error

	if err != nil {
		return transactionStatus, err
	}

	return transactionStatus, nil
}

func (r *repository) Delete(transactionStatus entity.TransactionStatus) (entity.TransactionStatus, error) {
	err := r.db.Delete(&transactionStatus)
	if err != nil {
		return transactionStatus, err.Error
	}
	return transactionStatus, nil
}
