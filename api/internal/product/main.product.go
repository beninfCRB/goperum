package product

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func ProductModule(r *gin.RouterGroup) {
	repo := ProductRepository(database.NewDatabase())
	service := ProductService(repo)
	controller := ProductController(service)

	r.POST("/products", controller.PostProduct)
	r.GET("/products", controller.GetProduct)
	r.GET("/products/:id", controller.GetProductID)
	r.PATCH("/products/:id", controller.UpdateProduct)
	r.DELETE("/products/:id", controller.DeleteProduct)
}
