package product

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(product entity.Product) (entity.Product, error)
	FindAll() ([]entity.Product, error)
	FindOne(ID uuid.UUID) (entity.Product, error)
	Update(product entity.Product) (entity.Product, error)
	Delete(product entity.Product) (entity.Product, error)
}

type repository struct {
	db *gorm.DB
}

func ProductRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(product entity.Product) (entity.Product, error) {
	product.ID = util.UUID()
	err := r.db.Create(&product).Error

	if err != nil {
		return product, err
	}

	return product, err
}

func (r *repository) FindAll() ([]entity.Product, error) {
	var products []entity.Product
	err := r.db.Find(&products).Error
	if err != nil {
		return products, err
	}
	return products, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Product, error) {
	var product entity.Product
	err := r.db.Where("id=?", ID).Find(&product).Error
	if err != nil {
		return product, err
	}
	return product, nil
}

func (r *repository) Update(product entity.Product) (entity.Product, error) {
	err := r.db.Updates(&product).Error

	if err != nil {
		return product, err
	}

	return product, nil
}

func (r *repository) Delete(product entity.Product) (entity.Product, error) {
	err := r.db.Delete(&product)
	if err != nil {
		return product, err.Error
	}
	return product, nil
}
