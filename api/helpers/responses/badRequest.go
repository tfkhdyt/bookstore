package responses

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func BadRequest(c *gin.Context, err error, message string) {
	c.JSON(http.StatusBadRequest, gin.H{
		"error":   err.Error(),
		"message": message,
	})
}
