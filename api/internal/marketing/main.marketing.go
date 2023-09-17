package marketing

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func MarketingModule(r *gin.RouterGroup) {
	repo := MarketingRepository(database.NewDatabase())
	service := MarketingService(repo)
	controller := MarketingController(service)

	r.POST("/marketings", controller.PostMarketing)
	r.GET("/marketings", controller.GetMarketing)
	r.GET("/marketings/:id", controller.GetMarketingID)
	r.PATCH("/marketings/:id", controller.UpdateMarketing)
	r.DELETE("/marketings/:id", controller.DeleteMarketing)
}
