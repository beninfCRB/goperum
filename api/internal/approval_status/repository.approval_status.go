package approval_status

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Respository interface {
	Create(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error)
	FindAll(params map[string]interface{}) ([]entity.TarnsactionStatus, error)
	FindOne(ID uuid.UUID) (entity.TarnsactionStatus, error)
	Update(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error)
	Delete(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error)
}

type repository struct {
	db *gorm.DB
}

func ApprovalStatusRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error) {
	approvalStatus.ID = util.UUID()
	err := r.db.Create(&approvalStatus).Error

	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, err
}

func (r *repository) FindAll(params map[string]interface{}) ([]entity.TarnsactionStatus, error) {
	var approvalStatuss []entity.TarnsactionStatus
	err := r.db.Preload(clause.Associations).Where(params).Find(&approvalStatuss).Error
	if err != nil {
		return approvalStatuss, err
	}
	return approvalStatuss, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.TarnsactionStatus, error) {
	var approvalStatus entity.TarnsactionStatus
	err := r.db.Preload(clause.Associations).Where("id=?", ID).Find(&approvalStatus).Error
	if err != nil {
		return approvalStatus, err
	}
	return approvalStatus, nil
}

func (r *repository) Update(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error) {
	err := r.db.Updates(&approvalStatus).Error

	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, nil
}

func (r *repository) Delete(approvalStatus entity.TarnsactionStatus) (entity.TarnsactionStatus, error) {
	err := r.db.Delete(&approvalStatus)
	if err != nil {
		return approvalStatus, err.Error
	}
	return approvalStatus, nil
}
