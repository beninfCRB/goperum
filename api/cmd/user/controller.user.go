package user

import (
	"fmt"
	"gostartup/cmd/auth"
	"gostartup/config/database/entity"
	"gostartup/pkg/util"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type useController struct {
	useService  Service
	authService auth.Service
}

func UserController(userService Service, authService auth.Service) *useController {
	return &useController{userService, authService}
}

func (r *useController) RegisterUser(c *gin.Context) {
	var input RegisterUserInput
	duration, _ := strconv.Atoi(os.Getenv("COOKIE_EXPIRED"))

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Register has been failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	user, err := r.useService.RegisterUser(input)
	if err != nil {
		response := util.Response("Register has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	accessToken, err := r.authService.GenerateAccessToken(user.ID.String())
	if err != nil {
		response := util.Response("Register has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	refreshToken, err := r.authService.GenerateRefreshToken(user.ID.String())
	if err != nil {
		response := util.Response("Register has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = r.useService.UpdateRefreshToken(user.ID, refreshToken)
	if err != nil {
		response := util.Response("Register has been failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	c.SetCookie("tk_r", refreshToken, 3600*duration, "/", os.Getenv("DOMAIN_COOKIE"), true, true)

	formatter := UserFormat(user, accessToken, refreshToken)
	response := util.Response("Account has been registered", http.StatusCreated, "success", formatter)
	c.JSON(http.StatusCreated, response)
}

func (r *useController) Login(c *gin.Context) {
	var input LoginUserInput
	duration, _ := strconv.Atoi(os.Getenv("COOKIE_EXPIRED"))

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Login failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	loggedinUser, err := r.useService.LoginUser(input)

	if err != nil {
		errorMessage := gin.H{"errors": err.Error()}

		response := util.Response("Login failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	accessToken, err := r.authService.GenerateAccessToken(loggedinUser.ID.String())
	if err != nil {
		response := util.Response("Login failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	refreshToken, err := r.authService.GenerateRefreshToken(loggedinUser.ID.String())
	if err != nil {
		response := util.Response("Login failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = r.useService.UpdateRefreshToken(loggedinUser.ID, refreshToken)
	if err != nil {
		response := util.Response("Login failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	c.SetCookie("tk_r", refreshToken, 3600*duration, "/", os.Getenv("DOMAIN_COOKIE"), true, true)

	formatter := UserFormat(loggedinUser, accessToken, refreshToken)
	response := util.Response("Successfully loggedin", http.StatusOK, "success", formatter)
	c.JSON(http.StatusOK, response)
}

func (r *useController) Logout(c *gin.Context) {
	input, err := c.Cookie("tk_r")
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Invalid renew access token", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	user, err := r.useService.GetRefreshToken(input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Token not found", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	_, err = r.useService.UpdateRefreshToken(user.ID, "")
	if err != nil {
		response := util.Response("Logout failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	c.SetCookie("tk_r", "", -1, "/", "", false, true)

	response := util.Response("Logout successfully", http.StatusOK, "success", nil)
	c.JSON(http.StatusOK, response)
}

func (r *useController) RefreshToken(c *gin.Context) {
	input, err := c.Cookie("tk_r")

	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Invalid refresh token", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	_, err = r.useService.GetRefreshToken(input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Token not found", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	token, err := r.authService.ValidateToken(input)
	if err != nil {
		response := util.Response("Invalid token", http.StatusUnauthorized, "error", nil)
		c.AbortWithStatusJSON(http.StatusUnauthorized, response)
		return
	}

	claim, ok := token.Claims.(jwt.MapClaims)

	if !ok || !token.Valid {
		response := util.Response("Unauthorized", http.StatusUnauthorized, "error", nil)
		c.AbortWithStatusJSON(http.StatusUnauthorized, response)
		return
	}

	userID := uuid.MustParse(claim["user_id"].(string))

	accessToken, err := r.authService.GenerateAccessToken(userID.String())
	if err != nil {
		response := util.Response("Login failed", http.StatusBadRequest, "error", nil)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response := util.Response("Renew access token successfully", http.StatusOK, "success", accessToken)
	c.JSON(http.StatusOK, response)
}

func (r *useController) CheckEmailAvailability(c *gin.Context) {
	var input CheckEmailInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		errors := util.ErrorValidation(err)
		errorMessage := gin.H{"errors": errors}

		response := util.Response("Checking email failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	isEmailAvailable, err := r.useService.IsEmailAvailable(input)
	if err != nil {
		errorMessage := gin.H{"errors": "Server error"}

		response := util.Response("Email checking failed", http.StatusUnprocessableEntity, "error", errorMessage)
		c.JSON(http.StatusUnprocessableEntity, response)
		return
	}

	data := gin.H{
		"is_available": isEmailAvailable,
	}

	metaMessage := "Email has been registered"

	if isEmailAvailable {
		metaMessage = "Email is available"
	}

	response := util.Response(metaMessage, http.StatusOK, "success", data)
	c.JSON(http.StatusOK, response)
}

func (r *useController) UploadAvatar(c *gin.Context) {
	file, err := c.FormFile("avatar")
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload avatar image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	currentUser := c.MustGet("currentUser").(entity.User)
	ID := uuid.MustParse(currentUser.ID.String())
	path := fmt.Sprintf("%s%s-%s", os.Getenv("PATH_UPLOAD"), ID, file.Filename)
	err = c.SaveUploadedFile(file, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload avatar image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	_, err = r.useService.SaveAvatar(ID, path)
	if err != nil {
		data := gin.H{
			"is_uploaded": false,
		}
		response := util.Response("Failed to upload avatar image", http.StatusBadRequest, "error", data)

		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{
		"is_uploaded": true,
	}
	response := util.Response("avatar successfully uploaded", http.StatusCreated, "success", data)
	c.JSON(http.StatusCreated, response)
}
