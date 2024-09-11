package product_image

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Save(productImage entity.ProductImage) (entity.ProductImage, error)
	FindAll() ([]entity.ProductImage, error)
	FindByID(ID uuid.UUID) (entity.ProductImage, error)
	Update(productImage entity.ProductImage) (entity.ProductImage, error)
	Delete(productImage entity.ProductImage) (entity.ProductImage, error)
}

type repository struct {
	db *gorm.DB
}

func ProductImageRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(productImage entity.ProductImage) (entity.ProductImage, error) {
	productImage.ID = util.UUID()
	err := r.db.Create(&productImage).Error

	if err != nil {
		return productImage, err
	}

	return productImage, err
}

func (r *repository) FindAll() ([]entity.ProductImage, error) {
	var productImage []entity.ProductImage
	err := r.db.Find(&productImage).Error
	if err != nil {
		return productImage, err
	}
	return productImage, nil
}

func (r *repository) FindByID(ID uuid.UUID) (entity.ProductImage, error) {
	var productImage entity.ProductImage
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&productImage).Error
	if err != nil {
		return productImage, err
	}
	return productImage, nil
}

func (r *repository) Update(user entity.ProductImage) (entity.ProductImage, error) {
	err := r.db.Updates(&user).Error

	if err != nil {
		return user, err
	}

	return user, nil
}

func (r *repository) Delete(productImage entity.ProductImage) (entity.ProductImage, error) {
	err := r.db.Delete(&productImage)
	if err != nil {
		return productImage, err.Error
	}
	return productImage, nil
}
