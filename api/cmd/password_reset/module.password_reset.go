package password_reset

import (
	"gostartup/cmd/user"
	"gostartup/config/database"
)

func PasswordServiceModule() *useController {
	userRepo := user.UserRepository(database.NewDatabase())
	userService := user.UserService(userRepo)
	repo := PasswordResetRepository(database.NewDatabase())
	service := PasswordResetService(repo)
	controller := ResetPasswordController(service, userService)

	return controller
}
