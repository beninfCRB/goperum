package payment_method

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreatePaymentMethod(input PaymentMethodInput) (entity.PaymentMethod, error)
	FindPaymentMethod() ([]entity.PaymentMethod, error)
	FindOnePaymentMethod(ID uuid.UUID) (entity.PaymentMethod, error)
	UpdatePaymentMethod(ID uuid.UUID, input PaymentMethodInput) (entity.PaymentMethod, error)
	DeletePaymentMethod(ID uuid.UUID) (entity.PaymentMethod, error)
}

type service struct {
	repository Respository
}

func PaymentMethodService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreatePaymentMethod(input PaymentMethodInput) (entity.PaymentMethod, error) {
	paymentMethod := entity.PaymentMethod{}
	paymentMethod.Code = input.Code
	paymentMethod.Name = input.Name
	paymentMethod.CreatedBy = input.CreatedBy
	paymentMethod.UpdatedBy = input.UpdatedBy

	newPaymentMethod, err := s.repository.Create(paymentMethod)
	if err != nil {
		return newPaymentMethod, err
	}
	return newPaymentMethod, nil
}

func (s *service) FindOnePaymentMethod(ID uuid.UUID) (entity.PaymentMethod, error) {
	paymentMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return paymentMethod, err
	}

	return paymentMethod, nil
}

func (s *service) FindPaymentMethod() ([]entity.PaymentMethod, error) {
	paymentMethod, err := s.repository.FindAll()
	if err != nil {
		return paymentMethod, err
	}

	return paymentMethod, nil
}

func (s *service) UpdatePaymentMethod(ID uuid.UUID, input PaymentMethodInput) (entity.PaymentMethod, error) {
	paymentMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return paymentMethod, err
	}

	paymentMethod.Code = input.Code
	paymentMethod.Name = input.Name
	paymentMethod.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(paymentMethod)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeletePaymentMethod(ID uuid.UUID) (entity.PaymentMethod, error) {
	paymentMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return paymentMethod, err
	}

	delete, err := s.repository.Delete(paymentMethod)
	if err != nil {
		return paymentMethod, err
	}

	return delete, nil
}
