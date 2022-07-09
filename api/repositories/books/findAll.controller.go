package books

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
	booksServices "github.com/tfkhdyt/bookstore/api/services/books"
)

// GET /books
// Find all books
func (repo *BooksRepository) FindAll(c *gin.Context) {
	var books []models.Book

	page := c.Query("page")
	limit := c.Query("limit")

	if page != "" && limit != "" {
		page, err := strconv.Atoi(page)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		limit, err := strconv.Atoi(limit)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := booksServices.FindAllBooksWithLimit(repo.DB, &books, page, limit); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		fmt.Println("Paginated books printed!")
		totalData, err := booksServices.GetTotalData(repo.DB)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":      books,
			"totalData": totalData,
		})
		return
	}

	if err := booksServices.FindAllBooksWithoutLimit(repo.DB, &books); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("All books printed!")
	c.JSON(http.StatusOK, gin.H{
		"data": books,
	})
}
