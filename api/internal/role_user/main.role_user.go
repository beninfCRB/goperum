package role_user

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func RoleUserModule(r *gin.RouterGroup) {
	repo := RoleUserRepository(database.NewDatabase())
	service := RoleUserService(repo)
	controller := RoleUserController(service)

	r.POST("/role_users", controller.PostRoleUser)
	r.GET("/role_users", controller.GetRoleUser)
	r.GET("/role_users/:id", controller.GetRoleUserID)
	r.PATCH("/role_users/:id", controller.UpdateRoleUser)
	r.DELETE("/role_users/:id", controller.DeleteRoleUser)
	r.DELETE("/role_users/code", controller.GetRoleUserByCode)
}
