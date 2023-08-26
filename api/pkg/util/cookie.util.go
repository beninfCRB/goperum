package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type token struct {
	accessToken  string
	refreshToken string
}

func SetCookies(accessToken string, refreshToken string) *token {
	return &token{accessToken, refreshToken}
}

func (v *token) Cookies(c *gin.Context) {
	c.SetSameSite(http.SameSiteNoneMode)
	if v.accessToken != "" {
		c.SetCookie("tk_a", v.accessToken, 3600, "/", "", false, true)
	}

	if v.refreshToken != "" {
		c.SetCookie("tk_r", v.refreshToken, 3600, "/", "", false, true)
	}
}
