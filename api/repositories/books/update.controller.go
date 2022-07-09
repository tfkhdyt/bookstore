package books

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
	booksServices "github.com/tfkhdyt/bookstore/api/services/books"
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
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Panicln(err.Error())
		return
	}

	if err := booksServices.FindBook(repo.DB, &book, id); err != nil {
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

	var coverImage string
	if input.CoverImage == "" {
		coverImage = book.CoverImage
	} else {
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

	if err := booksServices.UpdateBook(repo.DB, &book, updatedBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}
