package route

import (
	"gostartup/cmd/area"
	"gostartup/cmd/auth"
	"gostartup/cmd/customer"
	"gostartup/cmd/user"
	"gostartup/config/database"
	"gostartup/pkg/middleware"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var userRepo = user.UserRepository(database.NewDatabase())
var userService = user.UserService(userRepo)
var authService = auth.AuthService()
var userController = user.UserController(userService, authService)

func PublicRoutes(r *gin.RouterGroup) {
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": os.Getenv("APP_NAME"),
		})
	})
}

func PublicAPIRoutes(r *gin.RouterGroup) {
	r.POST("/users", userController.RegisterUser)
	r.POST("/email_checkers", userController.CheckEmailAvailability)
	r.POST("/sessions", userController.Login)
	r.POST("/refresh-token", userController.RefreshToken)
}

func PrivateAPIRoutes(r *gin.RouterGroup) {
	//user region

	auth := middleware.AuthMiddleware(authService, userService)
	r.Use(auth)

	r.POST("/avatars", userController.UploadAvatar)
	//===============================================================

	//customer region
	customer.Main(r)
	area.Main(r)
}
