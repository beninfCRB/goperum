package verification_user

import "time"

type VerificationUserInput struct {
	Email            string    `json:"email" binding:"required,email"`
	VerificationCode string    `json:"verification_code" binding:"required"`
	ExpiredAt        time.Time `json:"expired_at" binding:"required"`
}
