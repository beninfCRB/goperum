package product_image

import (
	"fmt"
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

func ProductImageController(productImageService Service) *controller {
	return &controller{productImageService}
}

func (r *controller) UploadImage(c *gin.Context) {
	ID := uuid.MustParse(c.PostForm("id"))
	file, err := c.FormFile("image")
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload image image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	currentTime := time.Now().String()
	path := fmt.Sprintf("%s%s-%s", os.Getenv("PATH_UPLOAD"), currentTime, file.Filename)
	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload image image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = r.useService.SaveImage(ID, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload image image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{
		"is_uploaded": true,
	}
	response := util.Response("image successfully uploaded", http.StatusCreated, "success", data)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetProductImageID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	productimage, err := r.useService.GetProductImageByID(ID)
	if err != nil {
		response := util.Response("Error to get productimage", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of productimage by id", http.StatusOK, "success", productimage)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetProductImage(c *gin.Context) {
	productimage, err := r.useService.FindProductImage()
	if err != nil {
		response := util.Response("Error to get productimage", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of productimage", http.StatusOK, "success", productimage)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateProductImage(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	file, err := c.FormFile("image")
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload image image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	currentTime := time.Now().String()
	path := fmt.Sprintf("%s%s-%s", os.Getenv("PATH_UPLOAD"), currentTime, file.Filename)
	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload image image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	productimage, err := r.useService.UpdateProductImage(ID, path)
	if err != nil {
		response := util.Response("Update productimage has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := ProductImageFormat(productimage)
	response := util.Response("ProductImage has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteProductImage(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	product, err := r.useService.DeleteProductImage(ID)
	if err != nil {
		response := util.Response("Error to delete product", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete product", http.StatusOK, "success", product)
	c.JSON(http.StatusOK, response)
}
