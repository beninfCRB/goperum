package transaction_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateTransactionStatus(input TransactionStatusInput) (entity.TransactionStatus, error)
	FindTransactionStatus() ([]entity.TransactionStatus, error)
	FindOneTransactionStatus(ID uuid.UUID) (entity.TransactionStatus, error)
	UpdateTransactionStatus(ID uuid.UUID, input TransactionStatusInput) (entity.TransactionStatus, error)
	DeleteTransactionStatus(ID uuid.UUID) (entity.TransactionStatus, error)
}

type service struct {
	repository Respository
}

func TransactionStatusService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateTransactionStatus(input TransactionStatusInput) (entity.TransactionStatus, error) {
	transactionStatus := entity.TransactionStatus{}
	transactionStatus.Code = input.Code
	transactionStatus.Name = input.Name
	transactionStatus.RoleUserID = input.RoleUserID
	transactionStatus.CreatedBy = input.CreatedBy
	transactionStatus.UpdatedBy = input.UpdatedBy

	newTransactionStatus, err := s.repository.Create(transactionStatus)
	if err != nil {
		return newTransactionStatus, err
	}
	return newTransactionStatus, nil
}

func (s *service) FindOneTransactionStatus(ID uuid.UUID) (entity.TransactionStatus, error) {
	transactionStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return transactionStatus, err
	}

	return transactionStatus, nil
}

func (s *service) FindTransactionStatus() ([]entity.TransactionStatus, error) {
	transactionStatus, err := s.repository.FindAll()
	if err != nil {
		return transactionStatus, err
	}

	return transactionStatus, nil
}

func (s *service) UpdateTransactionStatus(ID uuid.UUID, input TransactionStatusInput) (entity.TransactionStatus, error) {
	transactionStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return transactionStatus, err
	}

	transactionStatus.Code = input.Code
	transactionStatus.Name = input.Name
	transactionStatus.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(transactionStatus)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteTransactionStatus(ID uuid.UUID) (entity.TransactionStatus, error) {
	transactionStatus, err := s.repository.FindOne(ID)
	if err != nil {
		return transactionStatus, err
	}

	delete, err := s.repository.Delete(transactionStatus)
	if err != nil {
		return transactionStatus, err
	}

	return delete, nil
}
