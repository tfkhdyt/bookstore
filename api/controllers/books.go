package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

// structs
type CreateBookInput struct {
	Title         string `json:"title" binding:"required"`
	Author        string `json:"author" binding:"required"`
	ISBN          string `json:"isbn" binding:"required"`
	Description   string `json:"description" binding:"required"`
	Publisher     string `json:"publisher" binding:"required"`
	NumberOfPages uint   `json:"number_of_pages" binding:"required"`
}

type UpdateBookInput struct {
	Title         string `json:"title"`
	Author        string `json:"author"`
	ISBN          string `json:"isbn"`
	Description   string `json:"description"`
	Publisher     string `json:"publisher"`
	NumberOfPages uint   `json:"number_of_pages"`
}

// GET /books
// Get all books
func FindBooks(c *gin.Context) {
	var books []models.Book

	if err := models.DB.Find(&books).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// query checking
	var filteredBooks []models.Book
	fmt.Println(c.Params)
	if c.Query("title") != "" {
		for _, book := range books {
			if strings.Contains(strings.ToLower(book.Title), strings.ToLower(c.Query("title"))) {
				filteredBooks = append(filteredBooks, book)
			}
		}
	}
	if c.Query("author") != "" {
		for _, book := range books {
			if strings.Contains(strings.ToLower(book.Author), strings.ToLower(c.Query("author"))) {
				filteredBooks = append(filteredBooks, book)
			}
		}
	}
	if c.Query("isbn") != "" {
		for _, book := range books {
			if strings.Contains(strings.ToLower(book.ISBN), strings.ToLower(c.Query("isbn"))) {
				filteredBooks = append(filteredBooks, book)
			}
		}
	}
	if c.Query("publisher") != "" {
		for _, book := range books {
			if strings.Contains(strings.ToLower(book.Publisher), strings.ToLower(c.Query("publisher"))) {
				filteredBooks = append(filteredBooks, book)
			}
		}
	}
	if c.Query("number_of_pages") != "" {
		numberOfPages, err := strconv.ParseInt(c.Query("number_of_pages"), 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		for _, book := range books {
			if book.NumberOfPages == uint(numberOfPages) {
				filteredBooks = append(filteredBooks, book)
			}
		}
	}

	if len(filteredBooks) > 0 {
		fmt.Println("Filtered books printed!")
		c.JSON(http.StatusOK, gin.H{
			"data": filteredBooks,
		})
		return
	}

	fmt.Println("All books printed!")
	c.JSON(http.StatusOK, gin.H{
		"data": books,
	})
}

// POST /books
// Create a new book
func CreateBook(c *gin.Context) {
	// validate input
	var input CreateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
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
	}

	if err := models.DB.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": book,
	})
}

// GET /books/:id
// Find a book
func FindBook(c *gin.Context) {
	var book models.Book

	if err := models.DB.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Book not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}

// PATCH /books/:id
// Update book
func UpdateBook(c *gin.Context) {
	// get model if exist
	var book models.Book
	if err := models.DB.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
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

	updatedBook := models.Book{
		Title:         input.Title,
		Author:        input.Author,
		ISBN:          input.ISBN,
		Description:   input.Description,
		Publisher:     input.Publisher,
		NumberOfPages: input.NumberOfPages,
		UpdatedAt:     time.Now(),
	}

	if err := models.DB.Model(&book).Updates(updatedBook).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}

// DELETE /books/:id
func DeleteBook(c *gin.Context) {
	var book models.Book

	if err := models.DB.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := models.DB.Delete(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Book with id %v deleted successfully", c.Param("id")),
	})
}
