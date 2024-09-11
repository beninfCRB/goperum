package product

import (
	"fmt"
	"gostartup/config/database/entity"
	"gostartup/pkg/util"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type controller struct {
	useService Service
}

func ProductController(productService Service) *controller {
	return &controller{productService}
}

func (r *controller) PostProduct(c *gin.Context) {
	var input ProductInput
	file := input.Image
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add product has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	if file != nil {
		currentTime := time.Now().String()
		path := fmt.Sprintf("%s%s-%s", os.Getenv("PATH_UPLOAD"), currentTime, file.Filename)
		err = c.SaveUploadedFile(file, path)
		if err != nil {
			response := util.Response("Add Image", http.StatusBadRequest, "error", nil)
			c.JSON(http.StatusBadRequest, response)
			return
		}
	}

	product, err := r.useService.CreateProduct(input)
	if err != nil {
		response := util.Response("Add product has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := ProductFormat(product)
	response := util.Response("Product has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetProduct(c *gin.Context) {
	product, err := r.useService.FindProduct()
	if err != nil {
		response := util.Response("Error to get product", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of product", http.StatusOK, "success", product)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetProductID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	product, err := r.useService.FindOneProduct(ID)
	if err != nil {
		response := util.Response("Error to get product", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of product by id", http.StatusOK, "success", product)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateProduct(c *gin.Context) {
	var input ProductInput
	file := input.Image
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update product has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	if file != nil {
		fileOld, _ := r.useService.FindOneProduct(ID)

		if fileOld.Image != "" {
			os.Remove(fileOld.Image)
		}

		currentTime := time.Now().String()
		path := fmt.Sprintf("%s%s-%s", os.Getenv("PATH_UPLOAD"), currentTime, file.Filename)
		err = c.SaveUploadedFile(file, path)
		if err != nil {
			response := util.Response("Add Image", http.StatusBadRequest, "error", nil)
			c.JSON(http.StatusBadRequest, response)
			return
		}
	}

	product, err := r.useService.UpdateProduct(ID, input)
	if err != nil {
		response := util.Response("Update product has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := ProductFormat(product)
	response := util.Response("Product has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteProduct(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	product, err := r.useService.DeleteProduct(ID)
	if err != nil {
		response := util.Response("Error to delete product", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete product", http.StatusOK, "success", product)
	c.JSON(http.StatusOK, response)
}
