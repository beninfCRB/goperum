package type_down_payment

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error)
	FindAll() ([]entity.TypeDownPayment, error)
	FindOne(ID uuid.UUID) (entity.TypeDownPayment, error)
	Update(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error)
	Delete(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error)
}

type repository struct {
	db *gorm.DB
}

func TypeDownPaymentRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error) {
	typeDownPayment.ID = util.UUID()
	err := r.db.Create(&typeDownPayment).Error

	if err != nil {
		return typeDownPayment, err
	}

	return typeDownPayment, err
}

func (r *repository) FindAll() ([]entity.TypeDownPayment, error) {
	var typeDownPayments []entity.TypeDownPayment
	err := r.db.Find(&typeDownPayments).Error
	if err != nil {
		return typeDownPayments, err
	}
	return typeDownPayments, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.TypeDownPayment, error) {
	var typeDownPayment entity.TypeDownPayment
	err := r.db.Where("id=?", ID).Find(&typeDownPayment).Error
	if err != nil {
		return typeDownPayment, err
	}
	return typeDownPayment, nil
}

func (r *repository) Update(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error) {
	err := r.db.Updates(&typeDownPayment).Error

	if err != nil {
		return typeDownPayment, err
	}

	return typeDownPayment, nil
}

func (r *repository) Delete(typeDownPayment entity.TypeDownPayment) (entity.TypeDownPayment, error) {
	err := r.db.Delete(&typeDownPayment)
	if err != nil {
		return typeDownPayment, err.Error
	}
	return typeDownPayment, nil
}
