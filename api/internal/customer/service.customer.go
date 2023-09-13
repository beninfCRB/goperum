package customer

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateCustomer(input CustomerInput) (entity.Customer, error)
	FindCustomer() ([]entity.Customer, error)
	FindOneCustomer(ID uuid.UUID) (entity.Customer, error)
	UpdateCustomer(ID uuid.UUID, input CustomerInput) (entity.Customer, error)
	DeleteCustomer(ID uuid.UUID) (entity.Customer, error)
}

type service struct {
	repository Respository
}

func CustomerService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateCustomer(input CustomerInput) (entity.Customer, error) {
	customer := entity.Customer{}
	customer.Nik = input.Nik
	customer.Name = input.Name
	customer.Address = input.Address
	customer.Work = input.Work
	customer.Handphone = input.Handphone
	customer.CreatedBy = input.CreatedBy
	customer.UpdatedBy = input.UpdatedBy

	newCustomer, err := s.repository.Create(customer)
	if err != nil {
		return newCustomer, err
	}
	return newCustomer, nil
}

func (s *service) FindOneCustomer(ID uuid.UUID) (entity.Customer, error) {
	customer, err := s.repository.FindOne(ID)
	if err != nil {
		return customer, err
	}

	return customer, nil
}

func (s *service) FindCustomer() ([]entity.Customer, error) {
	customer, err := s.repository.FindAll()
	if err != nil {
		return customer, err
	}

	return customer, nil
}

func (s *service) UpdateCustomer(ID uuid.UUID, input CustomerInput) (entity.Customer, error) {
	customer, err := s.repository.FindOne(ID)
	if err != nil {
		return customer, err
	}

	customer.Nik = input.Nik
	customer.Name = input.Name
	customer.Address = input.Address
	customer.Work = input.Work
	customer.Handphone = input.Handphone
	customer.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(customer)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteCustomer(ID uuid.UUID) (entity.Customer, error) {
	customer, err := s.repository.FindOne(ID)
	if err != nil {
		return customer, err
	}

	delete, err := s.repository.Delete(customer)
	if err != nil {
		return customer, err
	}

	return delete, nil
}
