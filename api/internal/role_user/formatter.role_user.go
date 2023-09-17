package role_user

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type roleUserFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"blok"`
	Name string    `json:"kavling"`
}

func RoleUserFormat(role_user entity.RoleUser) roleUserFormat {
	formatter := roleUserFormat{
		ID:   role_user.ID,
		Code: role_user.Code,
		Name: role_user.Name,
	}
	return formatter
}
