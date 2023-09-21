package bank

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

func BankController(bankService Service) *controller {
	return &controller{bankService}
}

func (r *controller) PostBank(c *gin.Context) {
	var input BankInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add bank has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	bank, err := r.useService.CreateBank(input)
	if err != nil {
		response := util.Response("Add bank has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := BankFormat(bank)
	response := util.Response("Bank has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetBank(c *gin.Context) {
	bank, err := r.useService.FindBank()
	if err != nil {
		response := util.Response("Error to get bank", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of bank", http.StatusOK, "success", bank)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetBankID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	bank, err := r.useService.FindOneBank(ID)
	if err != nil {
		response := util.Response("Error to get bank", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of bank by id", http.StatusOK, "success", bank)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateBank(c *gin.Context) {
	var input BankInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update bank has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	bank, err := r.useService.UpdateBank(ID, input)
	if err != nil {
		response := util.Response("Update bank has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := BankFormat(bank)
	response := util.Response("Bank has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteBank(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	bank, err := r.useService.DeleteBank(ID)
	if err != nil {
		response := util.Response("Error to delete bank", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete bank", http.StatusOK, "success", bank)
	c.JSON(http.StatusOK, response)
}
