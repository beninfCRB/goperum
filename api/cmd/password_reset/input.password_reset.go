package password_reset

import "time"

type PasswordResetInput struct {
	Email     string    `json:"email" binding:"required,email"`
	ResetCode string    `json:"reset_code" binding:"required"`
	ExpiredAt time.Time `json:"expired_at" binding:"required"`
}
