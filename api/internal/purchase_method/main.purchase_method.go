package purchase_method

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func PurchaseMethodModule(r *gin.RouterGroup) {
	repo := PurchaseMethodRepository(database.NewDatabase())
	service := PurchaseMethodService(repo)
	controller := PurchaseMethodController(service)

	r.POST("/purchaseMethods", controller.PostPurchaseMethod)
	r.GET("/purchaseMethods", controller.GetPurchaseMethod)
	r.GET("/purchaseMethods/:id", controller.GetPurchaseMethodID)
	r.PATCH("/purchaseMethods/:id", controller.UpdatePurchaseMethod)
	r.DELETE("/purchaseMethods/:id", controller.DeletePurchaseMethod)
}
