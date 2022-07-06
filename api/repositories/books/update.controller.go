package books

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

type UpdateBookInput struct {
	Title         string `json:"title"`
	Author        string `json:"author"`
	ISBN          string `json:"isbn"`
	Description   string `json:"description"`
	Publisher     string `json:"publisher"`
	NumberOfPages uint   `json:"numberOfPages"`
	CoverImage    string `json:"coverImage"`
}

// PATCH /books/:id
// Update book
func (repo BooksRepository) UpdateBook(c *gin.Context) {
	// get model if exist
	var book models.Book
	if err := repo.DB.First(&book, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Book not found",
		})
		return
	}

	// validate input
	var input UpdateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var coverImage string = book.CoverImage
	if input.CoverImage != "" {
		coverImage = input.CoverImage
	}

	updatedBook := models.Book{
		Title:         input.Title,
		Author:        input.Author,
		ISBN:          input.ISBN,
		Description:   input.Description,
		Publisher:     input.Publisher,
		NumberOfPages: input.NumberOfPages,
		CoverImage:    coverImage,
	}

	if err := repo.DB.Model(&book).Updates(updatedBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}
