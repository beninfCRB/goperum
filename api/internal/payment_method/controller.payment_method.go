package payment_method

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

func PaymentMethodController(paymentMethodService Service) *controller {
	return &controller{paymentMethodService}
}

func (r *controller) PostPaymentMethod(c *gin.Context) {
	var input PaymentMethodInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add payment method has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	paymentMethod, err := r.useService.CreatePaymentMethod(input)
	if err != nil {
		response := util.Response("Add payment method has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PaymentMethodFormat(paymentMethod)
	response := util.Response("Payment method has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetPaymentMethod(c *gin.Context) {
	paymentMethod, err := r.useService.FindPaymentMethod()
	if err != nil {
		response := util.Response("Error to get payment method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of payment method", http.StatusOK, "success", paymentMethod)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetPaymentMethodID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	paymentMethod, err := r.useService.FindOnePaymentMethod(ID)
	if err != nil {
		response := util.Response("Error to get payment method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of payment method by id", http.StatusOK, "success", paymentMethod)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdatePaymentMethod(c *gin.Context) {
	var input PaymentMethodInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update payment method has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	paymentMethod, err := r.useService.UpdatePaymentMethod(ID, input)
	if err != nil {
		response := util.Response("Update payment method has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PaymentMethodFormat(paymentMethod)
	response := util.Response("Payment method has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeletePaymentMethod(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	paymentMethod, err := r.useService.DeletePaymentMethod(ID)
	if err != nil {
		response := util.Response("Error to delete payment method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete payment method", http.StatusOK, "success", paymentMethod)
	c.JSON(http.StatusOK, response)
}
