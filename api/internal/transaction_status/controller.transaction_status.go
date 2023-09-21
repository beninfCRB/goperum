package transaction_status

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

func TransactionStatusController(transactionStatusService Service) *controller {
	return &controller{transactionStatusService}
}

func (r *controller) PostTransactionStatus(c *gin.Context) {
	var input TransactionStatusInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add transactionStatus has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	transactionStatus, err := r.useService.CreateTransactionStatus(input)
	if err != nil {
		response := util.Response("Add transactionStatus has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TransactionStatusFormat(transactionStatus)
	response := util.Response("TransactionStatus has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetTransactionStatus(c *gin.Context) {
	transactionStatus, err := r.useService.FindTransactionStatus()
	if err != nil {
		response := util.Response("Error to get transactionStatus", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of transactionStatus", http.StatusOK, "success", transactionStatus)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetTransactionStatusID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	transactionStatus, err := r.useService.FindOneTransactionStatus(ID)
	if err != nil {
		response := util.Response("Error to get transactionStatus", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of transactionStatus by id", http.StatusOK, "success", transactionStatus)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateTransactionStatus(c *gin.Context) {
	var input TransactionStatusInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update transactionStatus has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	transactionStatus, err := r.useService.UpdateTransactionStatus(ID, input)
	if err != nil {
		response := util.Response("Update transactionStatus has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TransactionStatusFormat(transactionStatus)
	response := util.Response("TransactionStatus has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteTransactionStatus(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	transactionStatus, err := r.useService.DeleteTransactionStatus(ID)
	if err != nil {
		response := util.Response("Error to delete transactionStatus", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete transactionStatus", http.StatusOK, "success", transactionStatus)
	c.JSON(http.StatusOK, response)
}
