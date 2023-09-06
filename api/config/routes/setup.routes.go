package route

import (
	"gostartup/cmd/area"
	"gostartup/cmd/auth"
	"gostartup/cmd/customer"
	"gostartup/cmd/password_reset"
	"gostartup/cmd/user"
	"gostartup/cmd/verification_user"
	"gostartup/config/database"
	"gostartup/pkg/middleware"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var userModule = user.UserModule()
var verificatioUserModule = verification_user.VerificationUserModule()
var passwordResetModule = password_reset.PasswordServiceModule()

func PublicRoutes(r *gin.RouterGroup) {
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": os.Getenv("APP_NAME"),
		})
	})
}

func PublicAPIRoutes(r *gin.RouterGroup) {
	r.POST("/users", userModule.RegisterUser)
	r.POST("/email_checkers", userModule.CheckEmailAvailability)
	r.POST("/sessions", userModule.Login)
	r.POST("/refresh-token", userModule.RefreshToken)
	r.POST("/logout", userModule.Logout)
	r.POST("/verify-email/:verification_code", verificatioUserModule.VerificationUser)
	r.POST("/forgot-password", passwordResetModule.ForgotPassword)
	r.POST("/new-password/:reset_code", passwordResetModule.NewPassword)
}

func PrivateAPIRoutes(r *gin.RouterGroup) {
	//user region
	userRepo := user.UserRepository(database.NewDatabase())
	userService := user.UserService(userRepo)
	auth := middleware.AuthMiddleware(auth.AuthService(), userService)
	r.Use(auth)

	r.POST("/avatars", userModule.UploadAvatar)
	//===============================================================

	//customer region
	customer.CustomerModule(r)
	area.CustomerModule(r)
}
