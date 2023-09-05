package verification_user

import (
	"gostartup/config/database"
)

func VerificationUserModule() *useController {
	repo := VerificationUserRepository(database.NewDatabase())
	service := VerificationUserService(repo)
	controller := ResetPasswordController(service)

	return controller
}
