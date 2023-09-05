package user

import (
	"gostartup/cmd/auth"
	"gostartup/cmd/verification_user"
	"gostartup/config/database"
)

func UserModule() *useController {
	verificationRepo := verification_user.VerificationUserRepository(database.NewDatabase())
	verificationService := verification_user.VerificationUserService(verificationRepo)

	authService := auth.AuthService()

	repo := UserRepository(database.NewDatabase())
	service := UserService(repo)
	controller := UserController(service, authService, verificationService)

	return controller
}
