package product

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateProduct(input ProductInput) (entity.Product, error)
	FindProduct() ([]entity.Product, error)
	FindOneProduct(ID uuid.UUID) (entity.Product, error)
	UpdateProduct(ID uuid.UUID, input ProductInput) (entity.Product, error)
	DeleteProduct(ID uuid.UUID) (entity.Product, error)
}

type service struct {
	repository Respository
}

func ProductService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateProduct(input ProductInput) (entity.Product, error) {
	product := entity.Product{}
	product.Name = input.Name
	product.Model = input.Model
	product.Type = input.Type
	product.Blok = input.Blok
	product.Kavling = input.Kavling
	product.Sertifikat = input.Sertifikat
	product.Price = input.Price
	product.Description = input.Description
	product.Stock = input.Stock
	product.CreatedBy = input.CreatedBy
	product.UpdatedBy = input.UpdatedBy

	newProduct, err := s.repository.Create(product)
	if err != nil {
		return newProduct, err
	}
	return newProduct, nil
}

func (s *service) FindOneProduct(ID uuid.UUID) (entity.Product, error) {
	product, err := s.repository.FindOne(ID)
	if err != nil {
		return product, err
	}

	return product, nil
}

func (s *service) FindProduct() ([]entity.Product, error) {
	product, err := s.repository.FindAll()
	if err != nil {
		return product, err
	}

	return product, nil
}

func (s *service) UpdateProduct(ID uuid.UUID, input ProductInput) (entity.Product, error) {
	product, err := s.repository.FindOne(ID)
	if err != nil {
		return product, err
	}

	product.Name = input.Name
	product.Model = input.Model
	product.Type = input.Type
	product.Blok = input.Blok
	product.Kavling = input.Kavling
	product.Sertifikat = input.Sertifikat
	product.Price = input.Price
	product.Description = input.Description
	product.Stock = input.Stock
	product.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(product)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteProduct(ID uuid.UUID) (entity.Product, error) {
	product, err := s.repository.FindOne(ID)
	if err != nil {
		return product, err
	}

	delete, err := s.repository.Delete(product)
	if err != nil {
		return product, err
	}

	return delete, nil
}
