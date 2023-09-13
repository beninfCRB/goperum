package area

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

func AreaController(areaService Service) *controller {
	return &controller{areaService}
}

func (r *controller) PostArea(c *gin.Context) {
	var input AreaInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add area has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	area, err := r.useService.CreateArea(input)
	if err != nil {
		response := util.Response("Add area has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := AreaFormat(area)
	response := util.Response("Area has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetArea(c *gin.Context) {
	area, err := r.useService.FindArea()
	if err != nil {
		response := util.Response("Error to get area", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of area", http.StatusOK, "success", area)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetAreaID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	area, err := r.useService.FindOneArea(ID)
	if err != nil {
		response := util.Response("Error to get area", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of area by id", http.StatusOK, "success", area)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateArea(c *gin.Context) {
	var input AreaInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update area has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	area, err := r.useService.UpdateArea(ID, input)
	if err != nil {
		response := util.Response("Update area has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := AreaFormat(area)
	response := util.Response("Area has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteArea(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	area, err := r.useService.DeleteArea(ID)
	if err != nil {
		response := util.Response("Error to delete area", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete area", http.StatusOK, "success", area)
	c.JSON(http.StatusOK, response)
}
