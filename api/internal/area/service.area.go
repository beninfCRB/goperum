package area

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateArea(input AreaInput) (entity.Area, error)
	FindArea() ([]entity.Area, error)
	FindOneArea(ID uuid.UUID) (entity.Area, error)
	UpdateArea(ID uuid.UUID, input AreaInput) (entity.Area, error)
	DeleteArea(ID uuid.UUID) (entity.Area, error)
}

type service struct {
	repository Respository
}

func AreaService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateArea(input AreaInput) (entity.Area, error) {
	area := entity.Area{}
	area.Blok = input.Blok
	area.Kavling = input.Kavling
	area.Sertifikat = input.Sertifikat
	area.CreatedBy = input.CreatedBy
	area.UpdatedBy = input.UpdatedBy

	newArea, err := s.repository.Create(area)
	if err != nil {
		return newArea, err
	}
	return newArea, nil
}

func (s *service) FindOneArea(ID uuid.UUID) (entity.Area, error) {
	area, err := s.repository.FindOne(ID)
	if err != nil {
		return area, err
	}

	return area, nil
}

func (s *service) FindArea() ([]entity.Area, error) {
	area, err := s.repository.FindAll()
	if err != nil {
		return area, err
	}

	return area, nil
}

func (s *service) UpdateArea(ID uuid.UUID, input AreaInput) (entity.Area, error) {
	area, err := s.repository.FindOne(ID)
	if err != nil {
		return area, err
	}

	area.Blok = input.Blok
	area.Kavling = input.Kavling
	area.Sertifikat = input.Sertifikat
	area.UpdatedBy = input.UpdatedBy

	update, err := s.repository.Update(area)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteArea(ID uuid.UUID) (entity.Area, error) {
	area, err := s.repository.FindOne(ID)
	if err != nil {
		return area, err
	}

	delete, err := s.repository.Delete(area)
	if err != nil {
		return area, err
	}

	return delete, nil
}
