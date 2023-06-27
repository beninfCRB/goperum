package user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type userFormat struct {
	ID           uuid.UUID `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
}

func UserFormat(user entity.User, accessToken string, refreshToken string) userFormat {
	formatter := userFormat{
		ID:           user.ID,
		Name:         user.Name,
		Email:        user.Email,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
	return formatter
}
