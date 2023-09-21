package purchase_method

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error)
	FindAll() ([]entity.PurchaseMethod, error)
	FindOne(ID uuid.UUID) (entity.PurchaseMethod, error)
	Update(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error)
	Delete(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error)
}

type repository struct {
	db *gorm.DB
}

func PurchaseMethodRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error) {
	err := r.db.Create(&purchaseMethod).Error

	if err != nil {
		return purchaseMethod, err
	}

	return purchaseMethod, err
}

func (r *repository) FindAll() ([]entity.PurchaseMethod, error) {
	var purchaseMethods []entity.PurchaseMethod
	err := r.db.Find(&purchaseMethods).Error
	if err != nil {
		return purchaseMethods, err
	}
	return purchaseMethods, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.PurchaseMethod, error) {
	var purchaseMethod entity.PurchaseMethod
	err := r.db.Where("id=?", ID).Find(&purchaseMethod).Error
	if err != nil {
		return purchaseMethod, err
	}
	return purchaseMethod, nil
}

func (r *repository) Update(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error) {
	err := r.db.Save(&purchaseMethod).Error

	if err != nil {
		return purchaseMethod, err
	}

	return purchaseMethod, nil
}

func (r *repository) Delete(purchaseMethod entity.PurchaseMethod) (entity.PurchaseMethod, error) {
	err := r.db.Delete(&purchaseMethod)
	if err != nil {
		return purchaseMethod, err.Error
	}
	return purchaseMethod, nil
}
