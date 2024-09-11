package product_image

import (
	"errors"
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	SaveImage(ID uuid.UUID, input string) (entity.ProductImage, error)
	GetProductImageByID(ID uuid.UUID) (entity.ProductImage, error)
	FindProductImage() ([]entity.ProductImage, error)
	UpdateProductImage(ID uuid.UUID, input string) (entity.ProductImage, error)
	DeleteProductImage(ID uuid.UUID) (entity.ProductImage, error)
}

type service struct {
	repository Respository
}

func ProductImageService(repository Respository) *service {
	return &service{repository}
}

func (s *service) SaveImage(ID uuid.UUID, fileLocation string) (entity.ProductImage, error) {
	ProductImage, err := s.repository.FindByID(ID)
	if err != nil {
		return ProductImage, err
	}

	ProductImage.Path = fileLocation

	update, err := s.repository.Update(ProductImage)
	if err != nil {
		return update, err
	}
	return update, nil
}

func (s *service) GetProductImageByID(ID uuid.UUID) (entity.ProductImage, error) {
	ProductImage, err := s.repository.FindByID(ID)
	if err != nil {
		return ProductImage, err
	}

	if ProductImage.ID == uuid.Nil {
		return ProductImage, errors.New("no ProductImage found on with that ID")
	}

	return ProductImage, nil
}

func (s *service) FindProductImage() ([]entity.ProductImage, error) {
	ProductImage, err := s.repository.FindAll()
	if err != nil {
		return ProductImage, err
	}

	return ProductImage, nil
}

func (s *service) UpdateProductImage(ID uuid.UUID, fileLocation string) (entity.ProductImage, error) {
	ProductImage, err := s.repository.FindByID(ID)
	if err != nil {
		return ProductImage, err
	}

	ProductImage.Path = fileLocation

	update, err := s.repository.Update(ProductImage)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteProductImage(ID uuid.UUID) (entity.ProductImage, error) {
	product, err := s.repository.FindByID(ID)
	if err != nil {
		return product, err
	}

	delete, err := s.repository.Delete(product)
	if err != nil {
		return product, err
	}

	return delete, nil
}
