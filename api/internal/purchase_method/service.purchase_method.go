package purchase_method

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreatePurchaseMethod(input PurchaseMethodInput) (entity.PurchaseMethod, error)
	FindPurchaseMethod() ([]entity.PurchaseMethod, error)
	FindOnePurchaseMethod(ID uuid.UUID) (entity.PurchaseMethod, error)
	UpdatePurchaseMethod(ID uuid.UUID, input PurchaseMethodInput) (entity.PurchaseMethod, error)
	DeletePurchaseMethod(ID uuid.UUID) (entity.PurchaseMethod, error)
}

type service struct {
	repository Respository
}

func PurchaseMethodService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreatePurchaseMethod(input PurchaseMethodInput) (entity.PurchaseMethod, error) {
	purchaseMethod := entity.PurchaseMethod{}
	purchaseMethod.Code = input.Code
	purchaseMethod.Name = input.Name
	purchaseMethod.CreatedBy = input.CreatedBy
	purchaseMethod.UpdatedBy = input.UpdatedBy

	newPurchaseMethod, err := s.repository.Create(purchaseMethod)
	if err != nil {
		return newPurchaseMethod, err
	}
	return newPurchaseMethod, nil
}

func (s *service) FindOnePurchaseMethod(ID uuid.UUID) (entity.PurchaseMethod, error) {
	purchaseMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return purchaseMethod, err
	}

	return purchaseMethod, nil
}

func (s *service) FindPurchaseMethod() ([]entity.PurchaseMethod, error) {
	purchaseMethod, err := s.repository.FindAll()
	if err != nil {
		return purchaseMethod, err
	}

	return purchaseMethod, nil
}

func (s *service) UpdatePurchaseMethod(ID uuid.UUID, input PurchaseMethodInput) (entity.PurchaseMethod, error) {
	purchaseMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return purchaseMethod, err
	}

	purchaseMethod.Code = input.Code
	purchaseMethod.Name = input.Name
	purchaseMethod.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(purchaseMethod)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeletePurchaseMethod(ID uuid.UUID) (entity.PurchaseMethod, error) {
	purchaseMethod, err := s.repository.FindOne(ID)
	if err != nil {
		return purchaseMethod, err
	}

	delete, err := s.repository.Delete(purchaseMethod)
	if err != nil {
		return purchaseMethod, err
	}

	return delete, nil
}
