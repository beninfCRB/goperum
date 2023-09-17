package route

import (
	"gostartup/config/database"
	"gostartup/internal/auth"
	"gostartup/internal/customer"
	"gostartup/internal/marketing"
	"gostartup/internal/password_reset"
	"gostartup/internal/product"
	"gostartup/internal/role_user"
	"gostartup/internal/user"
	"gostartup/internal/verification_user"
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
	r.POST("/verify-email", verificatioUserModule.VerificationUser)
	r.POST("/re-verify-email", userModule.ResendCodeVerification)
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

	//region
	role_user.RoleUserModule(r)
	product.ProductModule(r)
	customer.CustomerModule(r)
	marketing.MarketingModule(r)
}
