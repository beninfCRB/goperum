package transaction

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateTransaction(input TransactionInput) (entity.Transaction, error)
	FindTransaction() ([]entity.Transaction, error)
	FindOneTransaction(ID uuid.UUID) (entity.Transaction, error)
	UpdateTransaction(ID uuid.UUID, input TransactionInput) (entity.Transaction, error)
	DeleteTransaction(ID uuid.UUID) (entity.Transaction, error)
}

type service struct {
	repository Respository
}

func TransactionService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateTransaction(input TransactionInput) (entity.Transaction, error) {
	transaction := entity.Transaction{}
	transaction.Code = input.Code
	transaction.CustomerID = input.CustomerID
	transaction.MarketingID = input.MarketingID
	transaction.ProductID = input.ProductID
	transaction.PurchaseMethodID = input.PurchaseMethodID
	transaction.DownPayment = input.DownPayment
	transaction.TypeDownPaymentID = input.TypeDownPaymentID
	transaction.LengthInstallmentDP = input.LengthInstallmentDP
	transaction.MonthlyInstallmentDP = input.MonthlyInstallmentDP
	transaction.Principal = input.Principal
	transaction.LengthInstallmentDP = input.LengthPrincipal
	transaction.MonthlyInstallmentDP = input.MonthlyInstallmentDP
	transaction.TotalBill = input.TotalBill
	transaction.CreatedBy = input.CreatedBy
	transaction.UpdatedBy = input.UpdatedBy

	newTransaction, err := s.repository.Create(transaction)
	if err != nil {
		return newTransaction, err
	}
	return newTransaction, nil
}

func (s *service) FindOneTransaction(ID uuid.UUID) (entity.Transaction, error) {
	transaction, err := s.repository.FindOne(ID)
	if err != nil {
		return transaction, err
	}

	return transaction, nil
}

func (s *service) FindTransaction() ([]entity.Transaction, error) {
	transaction, err := s.repository.FindAll()
	if err != nil {
		return transaction, err
	}

	return transaction, nil
}

func (s *service) UpdateTransaction(ID uuid.UUID, input TransactionInput) (entity.Transaction, error) {
	transaction, err := s.repository.FindOne(ID)
	if err != nil {
		return transaction, err
	}

	transaction.Code = input.Code
	transaction.CustomerID = input.CustomerID
	transaction.MarketingID = input.MarketingID
	transaction.ProductID = input.ProductID
	transaction.PurchaseMethodID = input.PurchaseMethodID
	transaction.DownPayment = input.DownPayment
	transaction.TypeDownPaymentID = input.TypeDownPaymentID
	transaction.LengthInstallmentDP = input.LengthInstallmentDP
	transaction.MonthlyInstallmentDP = input.MonthlyInstallmentDP
	transaction.Principal = input.Principal
	transaction.LengthInstallmentDP = input.LengthPrincipal
	transaction.MonthlyInstallmentDP = input.MonthlyInstallmentDP
	transaction.TotalBill = input.TotalBill
	transaction.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(transaction)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteTransaction(ID uuid.UUID) (entity.Transaction, error) {
	transaction, err := s.repository.FindOne(ID)
	if err != nil {
		return transaction, err
	}

	delete, err := s.repository.Delete(transaction)
	if err != nil {
		return transaction, err
	}

	return delete, nil
}
