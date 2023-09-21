package type_down_payment

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateTypeDownPayment(input TypeDownPaymentInput) (entity.TypeDownPayment, error)
	FindTypeDownPayment() ([]entity.TypeDownPayment, error)
	FindOneTypeDownPayment(ID uuid.UUID) (entity.TypeDownPayment, error)
	UpdateTypeDownPayment(ID uuid.UUID, input TypeDownPaymentInput) (entity.TypeDownPayment, error)
	DeleteTypeDownPayment(ID uuid.UUID) (entity.TypeDownPayment, error)
}

type service struct {
	repository Respository
}

func TypeDownPaymentService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateTypeDownPayment(input TypeDownPaymentInput) (entity.TypeDownPayment, error) {
	typeDownPayment := entity.TypeDownPayment{}
	typeDownPayment.Code = input.Code
	typeDownPayment.Name = input.Name
	typeDownPayment.CreatedBy = input.CreatedBy
	typeDownPayment.UpdatedBy = input.UpdatedBy

	newTypeDownPayment, err := s.repository.Create(typeDownPayment)
	if err != nil {
		return newTypeDownPayment, err
	}
	return newTypeDownPayment, nil
}

func (s *service) FindOneTypeDownPayment(ID uuid.UUID) (entity.TypeDownPayment, error) {
	typeDownPayment, err := s.repository.FindOne(ID)
	if err != nil {
		return typeDownPayment, err
	}

	return typeDownPayment, nil
}

func (s *service) FindTypeDownPayment() ([]entity.TypeDownPayment, error) {
	typeDownPayment, err := s.repository.FindAll()
	if err != nil {
		return typeDownPayment, err
	}

	return typeDownPayment, nil
}

func (s *service) UpdateTypeDownPayment(ID uuid.UUID, input TypeDownPaymentInput) (entity.TypeDownPayment, error) {
	typeDownPayment, err := s.repository.FindOne(ID)
	if err != nil {
		return typeDownPayment, err
	}

	typeDownPayment.Code = input.Code
	typeDownPayment.Name = input.Name
	typeDownPayment.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(typeDownPayment)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteTypeDownPayment(ID uuid.UUID) (entity.TypeDownPayment, error) {
	typeDownPayment, err := s.repository.FindOne(ID)
	if err != nil {
		return typeDownPayment, err
	}

	delete, err := s.repository.Delete(typeDownPayment)
	if err != nil {
		return typeDownPayment, err
	}

	return delete, nil
}
