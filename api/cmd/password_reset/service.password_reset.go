package password_reset

import (
	"gostartup/config/database/entity"
)

type Service interface {
	SavePasswordReset(input PasswordResetInput) (entity.PasswordReset, error)
	GetEmailNewPassword(code string) (entity.PasswordReset, error)
}

type service struct {
	repository Respository
}

func PasswordResetService(repository Respository) *service {
	return &service{repository}
}

func (s *service) SavePasswordReset(input PasswordResetInput) (entity.PasswordReset, error) {
	password_reset := entity.PasswordReset{}
	password_reset.Email = input.Email
	password_reset.ResetCode = input.ResetCode
	password_reset.ExpiredAt = &input.ExpiredAt

	save, err := s.repository.Save(password_reset)
	if err != nil {
		return save, err
	}

	return save, nil
}

func (s *service) GetEmailNewPassword(code string) (entity.PasswordReset, error) {
	password, err := s.repository.FindByCode(code)
	if err != nil {
		return password, err
	}

	return password, nil
}
