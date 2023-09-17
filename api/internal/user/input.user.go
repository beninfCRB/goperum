package user

import "github.com/google/uuid"

type RegisterUserInput struct {
	Name            string    `json:"name" binding:"required"`
	Email           string    `json:"email" binding:"required,email"`
	Password        string    `json:"password" binding:"required"`
	ConfirmPassword string    `json:"confirm_password" binding:"required"`
	RoleID          uuid.UUID `json:"role_id" binding:"required"`
}

type LoginUserInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type CheckEmailInput struct {
	Email string `json:"email" binding:"required,email"`
}

type ForgotPasswordInput struct {
	Email string `json:"email" binding:"required,email"`
}

type VerificationEmailInput struct {
	Email string `json:"email" binding:"required,email"`
}

type NewPasswordInput struct {
	Password        string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
}
