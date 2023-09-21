package type_down_payment

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

func TypeDownPaymentController(typeDownPaymentService Service) *controller {
	return &controller{typeDownPaymentService}
}

func (r *controller) PostTypeDownPayment(c *gin.Context) {
	var input TypeDownPaymentInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add typeDownPayment has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	typeDownPayment, err := r.useService.CreateTypeDownPayment(input)
	if err != nil {
		response := util.Response("Add typeDownPayment has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TypeDownPaymentFormat(typeDownPayment)
	response := util.Response("TypeDownPayment has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetTypeDownPayment(c *gin.Context) {
	typeDownPayment, err := r.useService.FindTypeDownPayment()
	if err != nil {
		response := util.Response("Error to get typeDownPayment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of typeDownPayment", http.StatusOK, "success", typeDownPayment)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetTypeDownPaymentID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	typeDownPayment, err := r.useService.FindOneTypeDownPayment(ID)
	if err != nil {
		response := util.Response("Error to get typeDownPayment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of typeDownPayment by id", http.StatusOK, "success", typeDownPayment)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateTypeDownPayment(c *gin.Context) {
	var input TypeDownPaymentInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update typeDownPayment has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	typeDownPayment, err := r.useService.UpdateTypeDownPayment(ID, input)
	if err != nil {
		response := util.Response("Update typeDownPayment has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := TypeDownPaymentFormat(typeDownPayment)
	response := util.Response("TypeDownPayment has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteTypeDownPayment(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	typeDownPayment, err := r.useService.DeleteTypeDownPayment(ID)
	if err != nil {
		response := util.Response("Error to delete typeDownPayment", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete typeDownPayment", http.StatusOK, "success", typeDownPayment)
	c.JSON(http.StatusOK, response)
}
