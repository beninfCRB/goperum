package user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type userFormat struct {
	ID             uuid.UUID `json:"id"`
	Name           string    `json:"name"`
	Email          string    `json:"email"`
	AvatarFileName string    `json:"avatar"`
	AccessToken    string    `json:"access_token"`
	// RefreshToken   string    `json:"refresh_token"`
	Role string `json:"role"`
}

func UserFormat(user entity.User, accessToken string, refreshToken string) userFormat {
	formatter := userFormat{
		ID:             user.ID,
		Name:           user.Name,
		Email:          user.Email,
		AvatarFileName: user.AvatarFileName,
		AccessToken:    accessToken,
		// RefreshToken:   refreshToken,
		Role: user.RoleUser.Code,
	}
	return formatter
}

type userUpdateFormat struct {
	ID       uuid.UUID   `json:"id"`
	Name     string      `json:"name"`
	Email    string      `json:"email"`
	RoleID   uuid.UUID   `json:"role_id"`
	RoleUser interface{} `json:"role_user"`
}

func UserUpdateFormat(user entity.User) userUpdateFormat {
	formatter := userUpdateFormat{
		ID:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		RoleID:   user.RoleID,
		RoleUser: user.RoleUser,
	}
	return formatter
}
