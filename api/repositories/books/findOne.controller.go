package books

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

// GET /books/:id
// Find a book
func (repo BooksRepository) FindOne(c *gin.Context) {
	var book models.Book

	// if err := models.DB.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
	if err := repo.DB.First(&book, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Book not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}
