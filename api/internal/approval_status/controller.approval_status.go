package approval_status

import (
	"gostartup/config/database/entity"
	"gostartup/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type controller struct {
	useService Service
}

func ApprovalStatusController(approvalStatusService Service) *controller {
	return &controller{approvalStatusService}
}

func (r *controller) PostApprovalStatus(c *gin.Context) {
	var input ApprovalStatusInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add approval status has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	approvalStatus, err := r.useService.CreateApprovalStatus(input)
	if err != nil {
		response := util.Response("Add approval status has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := ApprovalStatusFormat(approvalStatus)
	response := util.Response("Approval status has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetApprovalStatus(c *gin.Context) {
	search := c.Query("search")

	var params = make(map[string]interface{})

	if search != "" {
		params["code"] = "%" + search + "%"
		params["name"] = "%" + search + "%"
		params["role_user_id"] = "%" + search + "%"
	}

	approvalStatus, err := r.useService.FindApprovalStatus(params)
	if err != nil {
		response := util.Response("Error to get approval status", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of approval status", http.StatusOK, "success", approvalStatus)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetApprovalStatusID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	approvalStatus, err := r.useService.FindOneApprovalStatus(ID)
	if err != nil {
		response := util.Response("Error to get approval status", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of approval status by id", http.StatusOK, "success", approvalStatus)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateApprovalStatus(c *gin.Context) {
	var input ApprovalStatusInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update approval status has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	approvalStatus, err := r.useService.UpdateApprovalStatus(ID, input)
	if err != nil {
		response := util.Response("Update approval status has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := ApprovalStatusFormat(approvalStatus)
	response := util.Response("Approval status has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteApprovalStatus(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	approvalStatus, err := r.useService.DeleteApprovalStatus(ID)
	if err != nil {
		response := util.Response("Error to delete approval status", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete approval status", http.StatusOK, "success", approvalStatus)
	c.JSON(http.StatusOK, response)
}
