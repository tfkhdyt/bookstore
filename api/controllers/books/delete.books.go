package books

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

// DELETE /books/:id
func (repo BooksRepository) DeleteBook(c *gin.Context) {
	var book models.Book

	if err := repo.DB.First(&book, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := repo.DB.Delete(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Book with id %v deleted successfully", c.Param("id")),
	})
}
