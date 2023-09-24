package role_user

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func RoleUserModule(r *gin.RouterGroup) {
	repo := RoleUserRepository(database.NewDatabase())
	service := RoleUserService(repo)
	controller := RoleUserController(service)

	r.POST("/role-users", controller.PostRoleUser)
	r.GET("/role-users", controller.GetRoleUser)
	r.GET("/role-users/:id", controller.GetRoleUserID)
	r.PATCH("/role-users/:id", controller.UpdateRoleUser)
	r.DELETE("/role-users/:id", controller.DeleteRoleUser)
	r.GET("/role-users/code", controller.GetRoleUserByCode)
}
