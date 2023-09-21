package approval_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateApprovalStatus(input ApprovalStatusInput) (entity.ApprovalStatus, error)
	FindApprovalStatus() ([]entity.ApprovalStatus, error)
	FindOneApprovalStatus(ID uuid.UUID) (entity.ApprovalStatus, error)
	UpdateApprovalStatus(ID uuid.UUID, input ApprovalStatusInput) (entity.ApprovalStatus, error)
	DeleteApprovalStatus(ID uuid.UUID) (entity.ApprovalStatus, error)
}

type service struct {
	repository Respository
}

func ApprovalStatusService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateApprovalStatus(input ApprovalStatusInput) (entity.ApprovalStatus, error) {
	approvalStatus := entity.ApprovalStatus{}
	approvalStatus.Code = input.Code
	approvalStatus.Name = input.Name
	approvalStatus.RoleUserID = input.RoleUserID
	approvalStatus.CreatedBy = input.CreatedBy
	approvalStatus.UpdatedBy = input.UpdatedBy

	newApprovalStatus, err := s.repository.Create(approvalStatus)
	if err != nil {
		return newApprovalStatus, err
	}
	return newApprovalStatus, nil
}

func (s *service) FindOneApprovalStatus(ID uuid.UUID) (entity.ApprovalStatus, error) {
	approvalStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, nil
}

func (s *service) FindApprovalStatus() ([]entity.ApprovalStatus, error) {
	approvalStatus, err := s.repository.FindAll()
	if err != nil {
		return approvalStatus, err
	}

	return approvalStatus, nil
}

func (s *service) UpdateApprovalStatus(ID uuid.UUID, input ApprovalStatusInput) (entity.ApprovalStatus, error) {
	approvalStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return approvalStatus, err
	}

	approvalStatus.Code = input.Code
	approvalStatus.Name = input.Name
	approvalStatus.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(approvalStatus)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteApprovalStatus(ID uuid.UUID) (entity.ApprovalStatus, error) {
	approvalStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return approvalStatus, err
	}

	delete, err := s.repository.Delete(approvalStatus)
	if err != nil {
		return approvalStatus, err
	}

	return delete, nil
}
