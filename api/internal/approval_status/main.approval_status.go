package approval_status

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func ApprovalStatusModule(r *gin.RouterGroup) {
	repo := ApprovalStatusRepository(database.NewDatabase())
	service := ApprovalStatusService(repo)
	controller := ApprovalStatusController(service)

	r.POST("/approval-status", controller.PostApprovalStatus)
	r.GET("/approval-status", controller.GetApprovalStatus)
	r.GET("/approval-status/:id", controller.GetApprovalStatusID)
	r.PATCH("/approval-status/:id", controller.UpdateApprovalStatus)
	r.DELETE("/approval-status/:id", controller.DeleteApprovalStatus)
}
