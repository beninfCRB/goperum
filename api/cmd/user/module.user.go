package user

import (
	"gostartup/cmd/auth"
	"gostartup/config/database"
)

func UserModule() *useController {
	repo := UserRepository(database.NewDatabase())
	service := UserService(repo)
	authService := auth.AuthService()
	controller := UserController(service, authService)

	return controller
}
