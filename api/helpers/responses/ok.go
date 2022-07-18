package responses

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

func Ok(c *gin.Context, books *[]models.Book, totalData int) {
	c.JSON(http.StatusOK, gin.H{
		"data":      books,
		"totalData": totalData,
	})
}
