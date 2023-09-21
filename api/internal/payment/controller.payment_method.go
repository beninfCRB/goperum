package payment

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

func PaymentController(paymentService Service) *controller {
	return &controller{paymentService}
}

func (r *controller) PostPayment(c *gin.Context) {
	var input PaymentInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add payment has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	payment, err := r.useService.CreatePayment(input)
	if err != nil {
		response := util.Response("Add payment has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PaymentFormat(payment)
	response := util.Response("Payment has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetPayment(c *gin.Context) {
	payment, err := r.useService.FindPayment()
	if err != nil {
		response := util.Response("Error to get payment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of payment", http.StatusOK, "success", payment)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetPaymentID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	payment, err := r.useService.FindOnePayment(ID)
	if err != nil {
		response := util.Response("Error to get payment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of payment by id", http.StatusOK, "success", payment)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdatePayment(c *gin.Context) {
	var input PaymentInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update payment has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	payment, err := r.useService.UpdatePayment(ID, input)
	if err != nil {
		response := util.Response("Update payment has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PaymentFormat(payment)
	response := util.Response("Payment has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeletePayment(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	payment, err := r.useService.DeletePayment(ID)
	if err != nil {
		response := util.Response("Error to delete payment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete payment", http.StatusOK, "success", payment)
	c.JSON(http.StatusOK, response)
}
