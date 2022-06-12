package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
)

// structs
type CreateBookInput struct {
	Title  string `json:"title" binding:"required"`
	Author string `json:"author" binding:"required"`
}

type UpdateBookInput struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

// GET /books
// Get all books
func FindBooks(ctx *gin.Context) {
	var books []models.Book
	models.DB.Find(&books)

	ctx.JSON(http.StatusOK, gin.H{
		"data": books,
	})
}

// POST /books
// Create a new book
func CreateBook(ctx *gin.Context) {
	// validate input
	var input CreateBookInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// create book
	book := models.Book{
		Title:  input.Title,
		Author: input.Author,
	}
	models.DB.Create(&book)

	ctx.JSON(http.StatusCreated, gin.H{
		"data": book,
	})
}

// GET /books/:id
// Find a book
func FindBook(ctx *gin.Context) {
	var book models.Book

	if err := models.DB.Where("id = ?", ctx.Param("id")).First(&book).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": "Book not found",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": book,
	})
}

// PATCH /books/:id
// Update book
func UpdateBook(ctx *gin.Context) {
	// get model if exist
	var book models.Book
	if err := models.DB.Where("id = ?", ctx.Param("id")).First(&book).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": "Book not found",
		})
		return
	}

	// validate input
	var input UpdateBookInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	models.DB.Model(&book).Updates(input)
	ctx.JSON(http.StatusOK, gin.H{
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

	models.DB.Delete(&book)
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Book with id %v deleted successfully", c.Param("id")),
	})
}
