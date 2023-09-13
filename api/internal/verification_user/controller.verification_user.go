package verification_user

import (
	"gostartup/pkg/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type useController struct {
	useService Service
}

func ResetPasswordController(passwordResetService Service) *useController {
	return &useController{passwordResetService}
}

func (r *useController) VerificationUser(c *gin.Context) {
	var input VerificationEmailInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Verifiaction code not validated", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	code := util.Encode(input.VerificationCode)

	email, err := r.useService.GetEmailNewPassword(code)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Email not found", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	expiredAt := email.ExpiredAt
	currrentTime := time.Now()

	if expiredAt.Before(currrentTime) {
		response := util.Response("Code has been expired", http.StatusUnprocessableEntity, "error", nil)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	user, err := r.useService.GetEmail(email.Email)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Email not found", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	_, err = r.useService.UpdateUser(user.ID)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Verification email has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	response := util.Response("Verification email successfully", http.StatusCreated, "success", nil)
	c.JSON(http.StatusCreated, response)
}
