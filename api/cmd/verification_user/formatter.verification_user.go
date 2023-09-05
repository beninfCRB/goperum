package verification_user

import (
	"gostartup/config/database/entity"
	"time"
)

type verificationUserFormat struct {
	Email            string    `json:"email"`
	VerificationCode string    `json:"verification_code"`
	ExpiredAt        time.Time `json:"expired_at"`
}

func VerificationUserFormat(data entity.VerificationUser) verificationUserFormat {
	formatter := verificationUserFormat{
		Email:            data.Email,
		VerificationCode: data.VerificationCode,
		ExpiredAt:        *data.ExpiredAt,
	}
	return formatter
}
