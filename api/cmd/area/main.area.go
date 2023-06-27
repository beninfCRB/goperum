package area

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func Main(r *gin.RouterGroup) {
	repo := AreaRepository(database.NewDatabase())
	service := AreaService(repo)
	controller := AreaController(service)

	r.POST("/areas", controller.PostArea)
	r.GET("/areas", controller.GetArea)
	r.GET("/areas/:id", controller.GetAreaID)
	r.PATCH("/areas/:id", controller.UpdateArea)
	r.DELETE("/areas/:id", controller.DeleteArea)
}
