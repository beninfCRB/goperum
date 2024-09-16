package util

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func UploadFile(file *multipart.FileHeader, fileOld string, folder string, c *gin.Context) string {
	if file != nil {
		folder := fmt.Sprintf("%s%s", os.Getenv("PATH_UPLOAD"), folder)
		var _, err = os.Stat(folder)
		if os.IsNotExist(err) {
			err = os.Mkdir(folder, os.ModePerm)
			if err != nil {
				return ""
			}
		}
		if fileOld != "" {
			os.Remove(fmt.Sprintf("%s/%s", folder, fileOld))
		}

		currentTime := strconv.Itoa(int(time.Now().Unix()))
		path := fmt.Sprintf("%s/%s-%s", folder, currentTime, file.Filename)
		err = c.SaveUploadedFile(file, path)

		if err != nil {
			response := Response("Add Image failed", http.StatusBadRequest, "error", nil)
			c.JSON(http.StatusBadRequest, response)
			return ""
		}
		return path
	}
	return ""
}
