package payment

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreatePayment(input PaymentInput) (entity.Payment, error)
	FindPayment() ([]entity.Payment, error)
	FindOnePayment(ID uuid.UUID) (entity.Payment, error)
	UpdatePayment(ID uuid.UUID, input PaymentInput) (entity.Payment, error)
	DeletePayment(ID uuid.UUID) (entity.Payment, error)
}

type service struct {
	repository Respository
}

func PaymentService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreatePayment(input PaymentInput) (entity.Payment, error) {
	payment := entity.Payment{}
	payment.Code = input.Code
	payment.ConfirmDate = input.ConfirmDate
	payment.TransactionID = input.TransactionID
	payment.TotalPayment = input.TotalPayment
	payment.Information = input.Information
	payment.ApprovalStatusID = input.ApprovalStatusID
	payment.PaymentMethodID = input.PaymentMethodID
	payment.BankID = input.BankID
	payment.AccountName = input.AccountName
	payment.AccountNumber = input.AccountNumber
	payment.AccountReceivable = input.AccountReceivable
	payment.ProfPayment = input.ProfPayment
	payment.CreatedBy = input.CreatedBy
	payment.UpdatedBy = input.UpdatedBy

	newPayment, err := s.repository.Create(payment)
	if err != nil {
		return newPayment, err
	}
	return newPayment, nil
}

func (s *service) FindOnePayment(ID uuid.UUID) (entity.Payment, error) {
	payment, err := s.repository.FindOne(ID)
	if err != nil {
		return payment, err
	}

	return payment, nil
}

func (s *service) FindPayment() ([]entity.Payment, error) {
	payment, err := s.repository.FindAll()
	if err != nil {
		return payment, err
	}

	return payment, nil
}

func (s *service) UpdatePayment(ID uuid.UUID, input PaymentInput) (entity.Payment, error) {
	payment, err := s.repository.FindOne(ID)
	if err != nil {
		return payment, err
	}

	payment.Code = input.Code
	payment.ConfirmDate = input.ConfirmDate
	payment.TransactionID = input.TransactionID
	payment.TotalPayment = input.TotalPayment
	payment.Information = input.Information
	payment.ApprovalStatusID = input.ApprovalStatusID
	payment.PaymentMethodID = input.PaymentMethodID
	payment.BankID = input.BankID
	payment.AccountName = input.AccountName
	payment.AccountNumber = input.AccountNumber
	payment.AccountReceivable = input.AccountReceivable
	payment.ProfPayment = input.ProfPayment
	payment.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(payment)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeletePayment(ID uuid.UUID) (entity.Payment, error) {
	payment, err := s.repository.FindOne(ID)
	if err != nil {
		return payment, err
	}

	delete, err := s.repository.Delete(payment)
	if err != nil {
		return payment, err
	}

	return delete, nil
}
