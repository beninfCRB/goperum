package transaction

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func TransactionModule(r *gin.RouterGroup) {
	repo := TransactionRepository(database.NewDatabase())
	service := TransactionService(repo)
	controller := TransactionController(service)

	r.POST("/transactions", controller.PostTransaction)
	r.GET("/transactions", controller.GetTransaction)
	r.GET("/transactions/:id", controller.GetTransactionID)
	r.PATCH("/transactions/:id", controller.UpdateTransaction)
	r.DELETE("/transactions/:id", controller.DeleteTransaction)
}
