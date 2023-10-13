package purchase_method

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func PurchaseMethodModule(r *gin.RouterGroup) {
	repo := PurchaseMethodRepository(database.NewDatabase())
	service := PurchaseMethodService(repo)
	controller := PurchaseMethodController(service)

	r.POST("/purchase-methods", controller.PostPurchaseMethod)
	r.GET("/purchase-methods", controller.GetPurchaseMethod)
	r.GET("/purchase-methods/:id", controller.GetPurchaseMethodID)
	r.PATCH("/purchase-methods/:id", controller.UpdatePurchaseMethod)
	r.DELETE("/purchase-methods/:id", controller.DeletePurchaseMethod)
}
