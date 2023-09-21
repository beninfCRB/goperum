package bank

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func BankModule(r *gin.RouterGroup) {
	repo := BankRepository(database.NewDatabase())
	service := BankService(repo)
	controller := BankController(service)

	r.POST("/banks", controller.PostBank)
	r.GET("/banks", controller.GetBank)
	r.GET("/banks/:id", controller.GetBankID)
	r.PATCH("/banks/:id", controller.UpdateBank)
	r.DELETE("/banks/:id", controller.DeleteBank)
}
