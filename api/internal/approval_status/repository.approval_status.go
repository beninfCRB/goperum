package approval_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Create(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error)
	FindAll() ([]entity.ApprovalStatus, error)
	FindOne(ID uuid.UUID) (entity.ApprovalStatus, error)
	Update(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error)
	Delete(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error)
}

type repository struct {
	db *gorm.DB
}

func ApprovalStatusRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Create(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error) {
	err := r.db.Create(&approvalStatus).Error

	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, err
}

func (r *repository) FindAll() ([]entity.ApprovalStatus, error) {
	var approvalStatuss []entity.ApprovalStatus
	err := r.db.Find(&approvalStatuss).Error
	if err != nil {
		return approvalStatuss, err
	}
	return approvalStatuss, nil
}

func (r *repository) FindOne(ID uuid.UUID) (entity.ApprovalStatus, error) {
	var approvalStatus entity.ApprovalStatus
	err := r.db.Where("id=?", ID).Find(&approvalStatus).Error
	if err != nil {
		return approvalStatus, err
	}
	return approvalStatus, nil
}

func (r *repository) Update(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error) {
	err := r.db.Save(&approvalStatus).Error

	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, nil
}

func (r *repository) Delete(approvalStatus entity.ApprovalStatus) (entity.ApprovalStatus, error) {
	err := r.db.Delete(&approvalStatus)
	if err != nil {
		return approvalStatus, err.Error
	}
	return approvalStatus, nil
}
