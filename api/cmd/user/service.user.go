package user

import (
	"errors"
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	RegisterUser(input RegisterUserInput) (entity.User, error)
	LoginUser(input LoginUserInput) (entity.User, error)
	IsEmailAvailable(input CheckEmailInput) (bool, error)
	SaveAvatar(ID uuid.UUID, fileLocation string) (entity.User, error)
	GetUserByID(ID uuid.UUID) (entity.User, error)
}

type service struct {
	repository Respository
}

func UserService(repository Respository) *service {
	return &service{repository}
}

func (s *service) RegisterUser(input RegisterUserInput) (entity.User, error) {
	user := entity.User{}
	user.Name = input.Name
	user.Email = input.Email

	PasswordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.MinCost)
	if err != nil {
		return user, err
	}
	user.PasswordHash = string(PasswordHash)
	user.Role = "user"

	save, err := s.repository.Save(user)
	if err != nil {
		return save, err
	}

	return save, nil
}

func (s *service) LoginUser(input LoginUserInput) (entity.User, error) {
	email := input.Email
	password := input.Password

	user, err := s.repository.FindByEmail(email)
	if err != nil {
		return user, err
	}

	if user.ID == uuid.Nil {
		return user, errors.New("no user found on that email")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return user, err
	}
	return user, nil
}

func (s *service) IsEmailAvailable(input CheckEmailInput) (bool, error) {
	email := input.Email

	user, err := s.repository.FindByEmail(email)
	if err != nil {
		return false, err
	}

	if user.ID == uuid.Nil {
		return true, nil
	}

	return false, nil
}

func (s *service) SaveAvatar(ID uuid.UUID, fileLocation string) (entity.User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}

	user.AvatarFileName = fileLocation

	update, err := s.repository.Update(user)
	if err != nil {
		return update, err
	}
	return update, nil
}

func (s *service) GetUserByID(ID uuid.UUID) (entity.User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}

	if user.ID == uuid.Nil {
		return user, errors.New("no user founc on with that ID")
	}

	return user, nil
}