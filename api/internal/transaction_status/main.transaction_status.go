package transaction_status

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func TransactionStatusModule(r *gin.RouterGroup) {
	repo := TransactionStatusRepository(database.NewDatabase())
	service := TransactionStatusService(repo)
	controller := TransactionStatusController(service)

	r.POST("/transaction-status", controller.PostTransactionStatus)
	r.GET("/transaction-status", controller.GetTransactionStatus)
	r.GET("/transaction-status/:id", controller.GetTransactionStatusID)
	r.PATCH("/transaction-status/:id", controller.UpdateTransactionStatus)
	r.DELETE("/transaction-status/:id", controller.DeleteTransactionStatus)
}
