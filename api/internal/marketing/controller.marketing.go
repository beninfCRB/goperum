package marketing

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

func MarketingController(marketingService Service) *controller {
	return &controller{marketingService}
}

func (r *controller) PostMarketing(c *gin.Context) {
	var input MarketingInput
	input.UserID = entity.AutoGenereteUserBy(c)
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add marketing has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	marketing, err := r.useService.CreateMarketing(input)
	if err != nil {
		response := util.Response("Add marketing has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := MarketingFormat(marketing)
	response := util.Response("Marketing has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetMarketing(c *gin.Context) {
	marketing, err := r.useService.FindMarketing()
	if err != nil {
		response := util.Response("Error to get marketing", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := util.Response("List of marketing", http.StatusOK, "success", marketing)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetMarketingID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	marketing, err := r.useService.FindOneMarketing(ID)
	if err != nil {
		response := util.Response("Error to get marketing", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of marketing by id", http.StatusOK, "success", marketing)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateMarketing(c *gin.Context) {
	var input MarketingInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update marketing has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	marketing, err := r.useService.UpdateMarketing(ID, input)
	if err != nil {
		response := util.Response("Update marketing has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := MarketingFormat(marketing)
	response := util.Response("Marketing has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteMarketing(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	marketing, err := r.useService.DeleteMarketing(ID)
	if err != nil {
		response := util.Response("Error to delete marketing", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete marketing", http.StatusOK, "success", marketing)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetCustomerByUser(c *gin.Context) {
	ID := uuid.MustParse(c.Param("userid"))
	marketing, err := r.useService.FindOneMarketingByUser(ID)
	if err != nil {
		response := util.Response("Error to get marketing", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of marketing by user id", http.StatusOK, "success", marketing)
	c.JSON(http.StatusOK, response)
}
