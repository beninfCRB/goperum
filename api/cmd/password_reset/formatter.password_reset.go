package password_reset

import (
	"gostartup/config/database/entity"
)

type passwordResetFormat struct {
	Email     string `json:"email"`
	ResetCode string `json:"reset_code"`
}

func PasswordResetFormat(data entity.Password_reset) passwordResetFormat {
	formatter := passwordResetFormat{
		Email:     data.Email,
		ResetCode: data.ResetCode,
	}
	return formatter
}
