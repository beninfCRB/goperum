package customer

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Create(customer entity.Customer) (entity.Customer, error)
	FindAll() ([]entity.Customer, error)
	FindOne(ID uuid.UUID) (entity.Customer, error)
	Update(customer entity.Customer) (entity.Customer, error)
	Delete(customer entity.Customer) (entity.Customer, error)
}

type repository struct {
	db *gorm.DB
}

func CustomerRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(customer entity.Customer) (entity.Customer, error) {
	err := r.db.Create(&customer).Error

	if err != nil {
		return customer, err
	}

	return customer, err
}

func (r *repository) FindAll() ([]entity.Customer, error) {
	var customers []entity.Customer
	err := r.db.Preload(clause.Associations).Find(&customers).Error
	if err != nil {
		return customers, err
	}
	return customers, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Customer, error) {
	var customer entity.Customer
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&customer).Error
	if err != nil {
		return customer, err
	}
	return customer, nil
}

func (r *repository) Update(customer entity.Customer) (entity.Customer, error) {
	err := r.db.Save(&customer).Error

	if err != nil {
		return customer, err
	}

	return customer, nil
}

func (r *repository) Delete(customer entity.Customer) (entity.Customer, error) {
	err := r.db.Delete(&customer)
	if err != nil {
		return customer, err.Error
	}
	return customer, nil
}
