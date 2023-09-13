package area

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(area entity.Area) (entity.Area, error)
	FindAll() ([]entity.Area, error)
	FindOne(ID uuid.UUID) (entity.Area, error)
	Update(area entity.Area) (entity.Area, error)
	Delete(area entity.Area) (entity.Area, error)
}

type repository struct {
	db *gorm.DB
}

func AreaRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(area entity.Area) (entity.Area, error) {
	err := r.db.Create(&area).Error

	if err != nil {
		return area, err
	}

	return area, err
}

func (r *repository) FindAll() ([]entity.Area, error) {
	var areas []entity.Area
	err := r.db.Find(&areas).Error
	if err != nil {
		return areas, err
	}
	return areas, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Area, error) {
	var area entity.Area
	err := r.db.Where("id=?", ID).Find(&area).Error
	if err != nil {
		return area, err
	}
	return area, nil
}

func (r *repository) Update(area entity.Area) (entity.Area, error) {
	err := r.db.Save(&area).Error

	if err != nil {
		return area, err
	}

	return area, nil
}

func (r *repository) Delete(area entity.Area) (entity.Area, error) {
	err := r.db.Delete(&area)
	if err != nil {
		return area, err.Error
	}
	return area, nil
}
