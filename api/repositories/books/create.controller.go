package books

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
	booksService "github.com/tfkhdyt/bookstore/api/services/books"
)

type CreateBookInput struct {
	Title         string `json:"title" binding:"required"`
	Author        string `json:"author" binding:"required"`
	ISBN          string `json:"isbn" binding:"required"`
	Description   string `json:"description" binding:"required"`
	Publisher     string `json:"publisher" binding:"required"`
	NumberOfPages uint   `json:"numberOfPages" binding:"required"`
	CoverImage    string `json:"coverImage" binding:"required"`
}

// POST /books
// Create a new book
func (repo *BooksRepository) CreateBook(c *gin.Context) {
	// validate input
	var input CreateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"message": "Failed to bind json",
		})
		return
	}

	// create book
	book := models.Book{
		Title:         input.Title,
		Author:        input.Author,
		ISBN:          input.ISBN,
		Description:   input.Description,
		Publisher:     input.Publisher,
		NumberOfPages: input.NumberOfPages,
		CoverImage:    input.CoverImage,
	}

	if err := booksService.CreateBook(repo.DB, &book); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   err.Error(),
			"message": "Failed to create book",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": book,
	})
}
