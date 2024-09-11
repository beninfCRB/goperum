package product_image

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func ProductImageModule(r *gin.RouterGroup) {
	repo := ProductImageRepository(database.NewDatabase())
	service := ProductImageService(repo)
	controller := ProductImageController(service)

	r.POST("/product-image", controller.UploadImage)
	r.GET("/product-image", controller.GetProductImage)
	r.GET("/product-image/:id", controller.GetProductImageID)
	r.PATCH("/product-image/:id", controller.UpdateProductImage)
	r.DELETE("/product-image/:id", controller.DeleteProductImage)
}
