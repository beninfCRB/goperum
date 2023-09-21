package bank

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateBank(input BankInput) (entity.Bank, error)
	FindBank() ([]entity.Bank, error)
	FindOneBank(ID uuid.UUID) (entity.Bank, error)
	UpdateBank(ID uuid.UUID, input BankInput) (entity.Bank, error)
	DeleteBank(ID uuid.UUID) (entity.Bank, error)
}

type service struct {
	repository Respository
}

func BankService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateBank(input BankInput) (entity.Bank, error) {
	bank := entity.Bank{}
	bank.Code = input.Code
	bank.Name = input.Name
	bank.CreatedBy = input.CreatedBy
	bank.UpdatedBy = input.UpdatedBy

	newBank, err := s.repository.Create(bank)
	if err != nil {
		return newBank, err
	}
	return newBank, nil
}

func (s *service) FindOneBank(ID uuid.UUID) (entity.Bank, error) {
	bank, err := s.repository.FindOne(ID)
	if err != nil {
		return bank, err
	}

	return bank, nil
}

func (s *service) FindBank() ([]entity.Bank, error) {
	bank, err := s.repository.FindAll()
	if err != nil {
		return bank, err
	}

	return bank, nil
}

func (s *service) UpdateBank(ID uuid.UUID, input BankInput) (entity.Bank, error) {
	bank, err := s.repository.FindOne(ID)
	if err != nil {
		return bank, err
	}

	bank.Code = input.Code
	bank.Name = input.Name
	bank.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(bank)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteBank(ID uuid.UUID) (entity.Bank, error) {
	bank, err := s.repository.FindOne(ID)
	if err != nil {
		return bank, err
	}

	delete, err := s.repository.Delete(bank)
	if err != nil {
		return bank, err
	}

	return delete, nil
}
