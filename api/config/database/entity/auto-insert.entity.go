package entity

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AutoGenereteUserBy(c *gin.Context) uuid.UUID {
	ID := c.MustGet("currentUser").(User).ID
	return ID
}
