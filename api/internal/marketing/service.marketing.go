package marketing

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateMarketing(input MarketingInput) (entity.Marketing, error)
	FindMarketing() ([]entity.Marketing, error)
	FindOneMarketing(ID uuid.UUID) (entity.Marketing, error)
	UpdateMarketing(ID uuid.UUID, input MarketingInput) (entity.Marketing, error)
	DeleteMarketing(ID uuid.UUID) (entity.Marketing, error)
}

type service struct {
	repository Respository
}

func MarketingService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateMarketing(input MarketingInput) (entity.Marketing, error) {
	marketing := entity.Marketing{}
	marketing.Nik = input.Nik
	marketing.Numbemployee = input.Numbemployee
	marketing.Name = input.Name
	marketing.Address = input.Address
	marketing.Work = input.Work
	marketing.UserID = input.UserID
	marketing.Handphone = input.Handphone
	marketing.CreatedBy = input.CreatedBy
	marketing.UpdatedBy = input.UpdatedBy

	newMarketing, err := s.repository.Create(marketing)
	if err != nil {
		return newMarketing, err
	}
	return newMarketing, nil
}

func (s *service) FindOneMarketing(ID uuid.UUID) (entity.Marketing, error) {
	marketing, err := s.repository.FindOne(ID)
	if err != nil {
		return marketing, err
	}

	return marketing, nil
}

func (s *service) FindMarketing() ([]entity.Marketing, error) {
	marketing, err := s.repository.FindAll()
	if err != nil {
		return marketing, err
	}

	return marketing, nil
}

func (s *service) UpdateMarketing(ID uuid.UUID, input MarketingInput) (entity.Marketing, error) {
	marketing, err := s.repository.FindOne(ID)
	if err != nil {
		return marketing, err
	}

	marketing.Nik = input.Nik
	marketing.Numbemployee = input.Numbemployee
	marketing.Name = input.Name
	marketing.Address = input.Address
	marketing.Work = input.Work
	marketing.Handphone = input.Handphone
	marketing.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(marketing)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteMarketing(ID uuid.UUID) (entity.Marketing, error) {
	marketing, err := s.repository.FindOne(ID)
	if err != nil {
		return marketing, err
	}

	delete, err := s.repository.Delete(marketing)
	if err != nil {
		return marketing, err
	}

	return delete, nil
}
