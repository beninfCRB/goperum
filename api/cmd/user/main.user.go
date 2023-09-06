package user

import (
	"gostartup/cmd/auth"
	"gostartup/cmd/mac_device"
	"gostartup/cmd/verification_user"
	"gostartup/config/database"
)

func UserModule() *useController {
	db := database.NewDatabase()

	verificationRepo := verification_user.VerificationUserRepository(db)
	verificationService := verification_user.VerificationUserService(verificationRepo)

	macDeviceRepo := mac_device.MacDeviceRepository(db)
	macDeviceService := mac_device.MacDeviceService(macDeviceRepo)

	authService := auth.AuthService()

	repo := UserRepository(db)
	service := UserService(repo)
	controller := UserController(service, authService, verificationService, macDeviceService)

	return controller
}
