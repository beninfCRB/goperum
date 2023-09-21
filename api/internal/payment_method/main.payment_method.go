package payment_method

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func PaymentMethodModule(r *gin.RouterGroup) {
	repo := PaymentMethodRepository(database.NewDatabase())
	service := PaymentMethodService(repo)
	controller := PaymentMethodController(service)

	r.POST("/payment-methods", controller.PostPaymentMethod)
	r.GET("/payment-methods", controller.GetPaymentMethod)
	r.GET("/payment-methods/:id", controller.GetPaymentMethodID)
	r.PATCH("/payment-methods/:id", controller.UpdatePaymentMethod)
	r.DELETE("/payment-methods/:id", controller.DeletePaymentMethod)
}
