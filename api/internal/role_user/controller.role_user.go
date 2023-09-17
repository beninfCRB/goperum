package role_user

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

func RoleUserController(roleUserService Service) *controller {
	return &controller{roleUserService}
}

func (r *controller) PostRoleUser(c *gin.Context) {
	var input RoleUserInput
	input.CreatedBy = entity.AutoGenereteUserBy(c)
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Add role user has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	role_user, err := r.useService.CreateRoleUser(input)
	if err != nil {
		response := util.Response("Add role user has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := RoleUserFormat(role_user)
	response := util.Response("Role user has been created", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) GetRoleUser(c *gin.Context) {
	role_user, err := r.useService.FindRoleUser()
	if err != nil {
		response := util.Response("Error to get role user", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("List of role user", http.StatusOK, "success", role_user)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetRoleUserID(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	role_user, err := r.useService.FindOneRoleUser(ID)
	if err != nil {
		response := util.Response("Error to get role user", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of role_user by id", http.StatusOK, "success", role_user)
	c.JSON(http.StatusOK, response)
}

func (r *controller) UpdateRoleUser(c *gin.Context) {
	var input RoleUserInput
	ID := uuid.MustParse(c.Param("id"))
	input.UpdatedBy = entity.AutoGenereteUserBy(c)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Update role user has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	role_user, err := r.useService.UpdateRoleUser(ID, input)
	if err != nil {
		response := util.Response("Update role user has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	formatter := RoleUserFormat(role_user)
	response := util.Response("Role user has been updated", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *controller) DeleteRoleUser(c *gin.Context) {
	ID := uuid.MustParse(c.Param("id"))
	role_user, err := r.useService.DeleteRoleUser(ID)
	if err != nil {
		response := util.Response("Error to delete role user", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Delete role user", http.StatusOK, "success", role_user)
	c.JSON(http.StatusOK, response)
}

func (r *controller) GetRoleUserByCode(c *gin.Context) {
	var input RoleUserCodeInput
	role_user, err := r.useService.FindRoleUserByCode(input.Code)
	if err != nil {
		response := util.Response("Error to get role_user", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}
	response := util.Response("Get of role user by code", http.StatusOK, "success", role_user)
	c.JSON(http.StatusOK, response)
}
