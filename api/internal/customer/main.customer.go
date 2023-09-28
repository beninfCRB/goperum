package customer

import (
	"gostartup/config/database"

	"github.com/gin-gonic/gin"
)

func CustomerModule(r *gin.RouterGroup) {
	repo := CustomerRepository(database.NewDatabase())
	service := CustomerService(repo)
	controller := CustomerController(service)

	r.POST("/customers", controller.PostCustomer)
	r.GET("/customers", controller.GetCustomer)
	r.GET("/customers/:id", controller.GetCustomerID)
	r.PATCH("/customers/:id", controller.UpdateCustomer)
	r.DELETE("/customers/:id", controller.DeleteCustomer)
	r.GET("/customers/user/:userid", controller.GetCustomerByUser)
}
