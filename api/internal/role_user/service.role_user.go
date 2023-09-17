package role_user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	CreateRoleUser(input RoleUserInput) (entity.RoleUser, error)
	FindRoleUser() ([]entity.RoleUser, error)
	FindOneRoleUser(ID uuid.UUID) (entity.RoleUser, error)
	UpdateRoleUser(ID uuid.UUID, input RoleUserInput) (entity.RoleUser, error)
	DeleteRoleUser(ID uuid.UUID) (entity.RoleUser, error)
	FindRoleUserByCode(code string) (entity.RoleUser, error)
}

type service struct {
	repository Respository
}

func RoleUserService(repository Respository) *service {
	return &service{repository}
}

func (s *service) CreateRoleUser(input RoleUserInput) (entity.RoleUser, error) {
	roleUser := entity.RoleUser{}
	roleUser.Code = input.Code
	roleUser.Name = input.Name

	newRoleUser, err := s.repository.Create(roleUser)
	if err != nil {
		return newRoleUser, err
	}
	return newRoleUser, nil
}

func (s *service) FindOneRoleUser(ID uuid.UUID) (entity.RoleUser, error) {
	roleUser, err := s.repository.FindOne(ID)
	if err != nil {
		return roleUser, err
	}

	return roleUser, nil
}

func (s *service) FindRoleUser() ([]entity.RoleUser, error) {
	roleUser, err := s.repository.FindAll()
	if err != nil {
		return roleUser, err
	}

	return roleUser, nil
}

func (s *service) UpdateRoleUser(ID uuid.UUID, input RoleUserInput) (entity.RoleUser, error) {
	roleUser, err := s.repository.FindOne(ID)
	if err != nil {
		return roleUser, err
	}

	roleUser.Code = input.Code
	roleUser.Name = input.Name

	update, err := s.repository.Update(roleUser)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) DeleteRoleUser(ID uuid.UUID) (entity.RoleUser, error) {
	roleUser, err := s.repository.FindOne(ID)
	if err != nil {
		return roleUser, err
	}

	delete, err := s.repository.Delete(roleUser)
	if err != nil {
		return roleUser, err
	}

	return delete, nil
}

func (s *service) FindRoleUserByCode(code string) (entity.RoleUser, error) {
	roleUser, err := s.repository.FindCode(code)
	if err != nil {
		return roleUser, err
	}

	return roleUser, nil
}
