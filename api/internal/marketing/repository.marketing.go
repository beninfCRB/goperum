package marketing

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Create(marketing entity.Marketing) (entity.Marketing, error)
	FindAll() ([]entity.Marketing, error)
	FindOne(ID uuid.UUID) (entity.Marketing, error)
	Update(marketing entity.Marketing) (entity.Marketing, error)
	Delete(marketing entity.Marketing) (entity.Marketing, error)
	FindOneByUser(ID uuid.UUID) (entity.Marketing, error)
}

type repository struct {
	db *gorm.DB
}

func MarketingRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(marketing entity.Marketing) (entity.Marketing, error) {
	marketing.ID = util.UUID()
	err := r.db.Create(&marketing).Error

	if err != nil {
		return marketing, err
	}

	return marketing, err
}

func (r *repository) FindAll() ([]entity.Marketing, error) {
	var marketings []entity.Marketing
	err := r.db.Preload(clause.Associations).Find(&marketings).Error
	if err != nil {
		return marketings, err
	}
	return marketings, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.Marketing, error) {
	var marketing entity.Marketing
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&marketing).Error
	if err != nil {
		return marketing, err
	}
	return marketing, nil
}

func (r *repository) Update(marketing entity.Marketing) (entity.Marketing, error) {
	err := r.db.Updates(&marketing).Error

	if err != nil {
		return marketing, err
	}

	return marketing, nil
}

func (r *repository) Delete(marketing entity.Marketing) (entity.Marketing, error) {
	err := r.db.Delete(&marketing)
	if err != nil {
		return marketing, err.Error
	}
	return marketing, nil
}

func (r *repository) FindOneByUser(ID uuid.UUID) (entity.Marketing, error) {
	var marketing entity.Marketing
	err := r.db.Preload(clause.Associations).Where("user_id=?", ID).First(&marketing).Error
	if err != nil {
		return marketing, err
	}
	return marketing, nil
}
