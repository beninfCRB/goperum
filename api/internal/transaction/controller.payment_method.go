package transaction

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

func TransactionController(transactionService Service) *controller {
	return &controller{transactionService}
}

func (r *controller) PostTransaction(c *gin.Context) {
	var input TransactionInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add transaction has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	transaction, err := r.useService.CreateTransaction(input)
	if err != nil {
		response := util.Response("Add transaction has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TransactionFormat(transaction)
	response := util.Response("Transaction has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetTransaction(c *gin.Context) {
	transaction, err := r.useService.FindTransaction()
	if err != nil {
		response := util.Response("Error to get transaction", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of transaction", http.StatusOK, "success", transaction)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetTransactionID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	transaction, err := r.useService.FindOneTransaction(ID)
	if err != nil {
		response := util.Response("Error to get transaction", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of transaction by id", http.StatusOK, "success", transaction)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateTransaction(c *gin.Context) {
	var input TransactionInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update transaction has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	transaction, err := r.useService.UpdateTransaction(ID, input)
	if err != nil {
		response := util.Response("Update transaction has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TransactionFormat(transaction)
	response := util.Response("Transaction has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteTransaction(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	transaction, err := r.useService.DeleteTransaction(ID)
	if err != nil {
		response := util.Response("Error to delete transaction", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete transaction", http.StatusOK, "success", transaction)
	c.JSON(http.StatusOK, response)
}
