package password_reset

import (
	"gostartup/internal/user"
	"gostartup/pkg/util"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/thanhpk/randstr"
)

type useController struct {
	useService  Service
	userService user.Service
}

func ResetPasswordController(passwordResetService Service, userService user.Service) *useController {
	return &useController{passwordResetService, userService}
}

func (r *useController) ForgotPassword(c *gin.Context) {
	var input PasswordResetInput
	code := randstr.String(20)
	input.ResetCode = util.Encode(code)
	input.ExpiredAt = time.Now().Add(5 * time.Minute)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Reset password has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	user, err := r.userService.GetEmail(input.Email)
	if err != nil {
		response := util.Response(err.Error(), http.StatusUnprocessableEntity, "error", nil)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	save, err := r.useService.SavePasswordReset(input)
	if err != nil {
		response := util.Response("Reset password has been failed", http.StatusUnprocessableEntity, "error", nil)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	var firstName = user.Name

	if strings.Contains(firstName, " ") {
		firstName = strings.Split(firstName, " ")[1]
	}

	emailData := util.EmailData{
		URL:       os.Getenv("URL_CLIENT") + "/new-password/" + code,
		Title: "reset your account",
		Code: code,
		FirstName: firstName,
		Subject:   "Your reset code",
	}

	util.SendEmail(&user, &emailData)

	formatter := PasswordResetFormat(save)
	response := util.Response("Reset code has been sent", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *useController) NewPassword(c *gin.Context) {
	var input user.NewPasswordInput
	param := c.Param("reset_code")
	code := util.Encode(param)

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Create new password has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

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

	user, err := r.userService.GetEmail(email.Email)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response(err.Error(), http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	_, err = r.userService.UpdateUser(user.ID, input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Create new password has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	response := util.Response("Create new password successfully", http.StatusCreated, "success", nil)
	c.JSON(http.StatusCreated, response)
}
