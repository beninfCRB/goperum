package type_down_payment

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func TypeDownPaymentModule(r *gin.RouterGroup) {
	repo := TypeDownPaymentRepository(database.NewDatabase())
	service := TypeDownPaymentService(repo)
	controller := TypeDownPaymentController(service)

	r.POST("/type-down-payments", controller.PostTypeDownPayment)
	r.GET("/type-down-payments", controller.GetTypeDownPayment)
	r.GET("/type-down-payments/:id", controller.GetTypeDownPaymentID)
	r.PATCH("/type-down-payments/:id", controller.UpdateTypeDownPayment)
	r.DELETE("/type-down-payments/:id", controller.DeleteTypeDownPayment)
}
