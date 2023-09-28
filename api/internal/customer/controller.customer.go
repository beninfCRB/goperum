package customer

import (
	"fmt"
	"gostartup/config/database/entity"
	"gostartup/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type controller struct {
	useService Service
}

func CustomerController(customerService Service) *controller {
	return &controller{customerService}
}

func (r *controller) PostCustomer(c *gin.Context) {
	var input CustomerInput
	input.UserID = entity.AutoGenereteUserBy(c)
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add customer has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	customer, err := r.useService.CreateCustomer(input)
	if err != nil {
		response := util.Response("Add customer has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := CustomerFormat(customer)
	response := util.Response("Customer has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetCustomer(c *gin.Context) {
	customer, err := r.useService.FindCustomer()
	if err != nil {
		response := util.Response("Error to get customer", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := util.Response("List of customer", http.StatusOK, "success", customer)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetCustomerID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	customer, err := r.useService.FindOneCustomer(ID)
	fmt.Println(err)
	if err != nil {
		response := util.Response("Error to get customer", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of customer by id", http.StatusOK, "success", customer)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateCustomer(c *gin.Context) {
	var input CustomerInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update customer has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	customer, err := r.useService.UpdateCustomer(ID, input)
	if err != nil {
		response := util.Response("Update customer has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := CustomerFormat(customer)
	response := util.Response("Customer has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteCustomer(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	customer, err := r.useService.DeleteCustomer(ID)
	if err != nil {
		response := util.Response("Error to delete customer", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete customer", http.StatusOK, "success", customer)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetCustomerByUser(c *gin.Context) {
	ID := uuid.MustParse(c.Param("userid"))
	customer, err := r.useService.FindOneCustomerByUser(ID)
	if err != nil {
		response := util.Response("Error to get customer", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of customer by user id", http.StatusOK, "success", customer)
	c.JSON(http.StatusOK, response)
}
