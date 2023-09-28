package purchase_method

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

func PurchaseMethodController(purchaseMethodService Service) *controller {
	return &controller{purchaseMethodService}
}

func (r *controller) PostPurchaseMethod(c *gin.Context) {
	var input PurchaseMethodInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add purchase method has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	purchaseMethod, err := r.useService.CreatePurchaseMethod(input)
	if err != nil {
		response := util.Response("Add purchase method has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PurchaseMethodFormat(purchaseMethod)
	response := util.Response("Purchase method has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetPurchaseMethod(c *gin.Context) {
	purchaseMethod, err := r.useService.FindPurchaseMethod()
	if err != nil {
		response := util.Response("Error to get purchase method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of purchase method", http.StatusOK, "success", purchaseMethod)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetPurchaseMethodID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	purchaseMethod, err := r.useService.FindOnePurchaseMethod(ID)
	if err != nil {
		response := util.Response("Error to get purchase method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of purchase method by id", http.StatusOK, "success", purchaseMethod)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdatePurchaseMethod(c *gin.Context) {
	var input PurchaseMethodInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update purchase method has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	purchaseMethod, err := r.useService.UpdatePurchaseMethod(ID, input)
	if err != nil {
		response := util.Response("Update purchase method has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := PurchaseMethodFormat(purchaseMethod)
	response := util.Response("Purchase method has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeletePurchaseMethod(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	purchaseMethod, err := r.useService.DeletePurchaseMethod(ID)
	if err != nil {
		response := util.Response("Error to delete purchase method", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete purchase method", http.StatusOK, "success", purchaseMethod)
	c.JSON(http.StatusOK, response)
}
