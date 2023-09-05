package password_reset

import (
	"gostartup/config/database/entity"
	"time"
)

type passwordResetFormat struct {
	Email     string    `json:"email"`
	ResetCode string    `json:"reset_code"`
	ExpiredAt time.Time `json:"expired_at"`
}

func PasswordResetFormat(data entity.PasswordReset) passwordResetFormat {
	formatter := passwordResetFormat{
		Email:     data.Email,
		ResetCode: data.ResetCode,
		ExpiredAt: *data.ExpiredAt,
	}
	return formatter
}
