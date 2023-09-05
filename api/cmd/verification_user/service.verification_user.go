package verification_user

import (
	"errors"
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type Service interface {
	SaveVerificationUser(input VerificationUserInput) (entity.VerificationUser, error)
	GetEmailNewPassword(code string) (entity.VerificationUser, error)
	GetEmail(email string) (entity.User, error)
	UpdateUser(ID uuid.UUID) (entity.User, error)
}

type service struct {
	repository Respository
}

func VerificationUserService(repository Respository) *service {
	return &service{repository}
}

func (s *service) SaveVerificationUser(input VerificationUserInput) (entity.VerificationUser, error) {
	verificationUser := entity.VerificationUser{}
	verificationUser.Email = input.Email
	verificationUser.VerificationCode = input.VerificationCode
	verificationUser.ExpiredAt = &input.ExpiredAt

	save, err := s.repository.Save(verificationUser)
	if err != nil {
		return save, err
	}

	return save, nil
}

func (s *service) GetEmailNewPassword(code string) (entity.VerificationUser, error) {
	password, err := s.repository.FindByCode(code)
	if err != nil {
		return password, err
	}

	return password, nil
}

func (s *service) GetEmail(email string) (entity.User, error) {
	user, err := s.repository.FindByEmail(email)
	if err != nil {
		return user, err
	}

	if user.ID == uuid.Nil {
		return user, errors.New("email not found")
	}

	return user, nil
}

func (s *service) UpdateUser(ID uuid.UUID) (entity.User, error) {
	user, err := s.repository.FindByID(ID)
	if err != nil {
		return user, err
	}

	user.IsVerify = true
	update, err := s.repository.UpdateUser(user)
	if err != nil {
		return update, err
	}

	return update, nil
}
