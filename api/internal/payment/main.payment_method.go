package payment

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func PaymentModule(r *gin.RouterGroup) {
	repo := PaymentRepository(database.NewDatabase())
	service := PaymentService(repo)
	controller := PaymentController(service)

	r.POST("/payments", controller.PostPayment)
	r.GET("/payments", controller.GetPayment)
	r.GET("/payments/:id", controller.GetPaymentID)
	r.PATCH("/payments/:id", controller.UpdatePayment)
	r.DELETE("/payments/:id", controller.DeletePayment)
}
