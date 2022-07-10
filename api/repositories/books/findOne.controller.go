package books

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
	booksServices "github.com/tfkhdyt/bookstore/api/services/books"
)

// GET /books/:id
// Find a book
func (repo *BooksRepository) FindOne(c *gin.Context) {
	var book models.Book

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"message": "Failed to convert id to int",
		})
		return
	}

	// if err := models.DB.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
	if err := booksServices.FindBook(repo.DB, &book, id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   err.Error(),
			"message": "Book not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}
