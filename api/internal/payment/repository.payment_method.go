package payment

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Create(payment entity.Payment) (entity.Payment, error)
	FindAll() ([]entity.Payment, error)
	FindOne(ID uuid.UUID) (entity.Payment, error)
	Update(payment entity.Payment) (entity.Payment, error)
	Delete(payment entity.Payment) (entity.Payment, error)
}

type repository struct {
	db *gorm.DB
}

func PaymentRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(payment entity.Payment) (entity.Payment, error) {
	err := r.db.Create(&payment).Error

	if err != nil {
		return payment, err
	}

	return payment, err
}

func (r *repository) FindAll() ([]entity.Payment, error) {
	var payments []entity.Payment
	err := r.db.Preload(clause.Associations).Find(&payments).Error
	if err != nil {
		return payments, err
	}
	return payments, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Payment, error) {
	var payment entity.Payment
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&payment).Error
	if err != nil {
		return payment, err
	}
	return payment, nil
}

func (r *repository) Update(payment entity.Payment) (entity.Payment, error) {
	err := r.db.Save(&payment).Error

	if err != nil {
		return payment, err
	}

	return payment, nil
}

func (r *repository) Delete(payment entity.Payment) (entity.Payment, error) {
	err := r.db.Delete(&payment)
	if err != nil {
		return payment, err.Error
	}
	return payment, nil
}
