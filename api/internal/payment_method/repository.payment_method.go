package payment_method

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error)
	FindAll() ([]entity.PaymentMethod, error)
	FindOne(ID uuid.UUID) (entity.PaymentMethod, error)
	Update(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error)
	Delete(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error)
}

type repository struct {
	db *gorm.DB
}

func PaymentMethodRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error) {
	paymentMethod.ID = util.UUID()
	err := r.db.Create(&paymentMethod).Error

	if err != nil {
		return paymentMethod, err
	}

	return paymentMethod, err
}

func (r *repository) FindAll() ([]entity.PaymentMethod, error) {
	var paymentMethods []entity.PaymentMethod
	err := r.db.Find(&paymentMethods).Error
	if err != nil {
		return paymentMethods, err
	}
	return paymentMethods, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.PaymentMethod, error) {
	var paymentMethod entity.PaymentMethod
	err := r.db.Where("id=?", ID).Find(&paymentMethod).Error
	if err != nil {
		return paymentMethod, err
	}
	return paymentMethod, nil
}

func (r *repository) Update(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error) {
	err := r.db.Updates(&paymentMethod).Error

	if err != nil {
		return paymentMethod, err
	}

	return paymentMethod, nil
}

func (r *repository) Delete(paymentMethod entity.PaymentMethod) (entity.PaymentMethod, error) {
	err := r.db.Delete(&paymentMethod)
	if err != nil {
		return paymentMethod, err.Error
	}
	return paymentMethod, nil
}
