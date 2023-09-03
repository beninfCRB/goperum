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
	UpdateUser(ID uuid.UUID, input NewPasswordInput) (entity.User, error)
	UpdateRefreshToken(ID uuid.UUID, input string) (entity.User, error)
	GetRefreshToken(refreshToken string) (entity.User, error)
	VerifyEmail(code string) (entity.User, error)
	GetEmail(email string) (entity.User, error)
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
	user.VerificationCode = input.VerificationCode

	if input.Password != input.ConfirmPassword {
		return user, errors.New("password not match")
	}

	PasswordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	ConfirmPasswordHash, err := bcrypt.GenerateFromPassword([]byte(input.ConfirmPassword), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	user.PasswordHash = string(PasswordHash)
	user.ConfirmPasswordHash = string(ConfirmPasswordHash)
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

func (s *service) UpdateRefreshToken(ID uuid.UUID, input string) (entity.User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}

	user.RefreshToken = input

	update, err := s.repository.Update(user)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) UpdateUser(ID uuid.UUID, input NewPasswordInput) (entity.User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}
	if input.Password != input.ConfirmPassword {
		return user, errors.New("password not match")
	}

	PasswordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	ConfirmPasswordHash, err := bcrypt.GenerateFromPassword([]byte(input.ConfirmPassword), bcrypt.MinCost)
	if err != nil {
		return user, err
	}

	user.PasswordHash = string(PasswordHash)
	user.ConfirmPasswordHash = string(ConfirmPasswordHash)

	update, err := s.repository.Update(user)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) GetRefreshToken(refreshToken string) (entity.User, error) {
	user, err := s.repository.FindByRefresToken(refreshToken)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (s *service) VerifyEmail(code string) (entity.User, error) {
	user, err := s.repository.FindVerificationCode(code)
	if err != nil {
		return user, err
	}

	user.IsVerify = true
	update, err := s.repository.Update(user)
	if err != nil {
		return update, err
	}

	return update, nil
}

func (s *service) GetEmail(email string) (entity.User, error) {
	user, err := s.repository.FindByEmail(email)
	if err != nil {
		return user, err
	}

	if user.ID == uuid.Nil {
		return user, nil
	}

	return user, nil
}
