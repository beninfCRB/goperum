package password_reset

type PasswordResetInput struct {
	Email     string `json:"email" binding:"required,email"`
	ResetCode string `json:"reset_code" binding:"required"`
}
