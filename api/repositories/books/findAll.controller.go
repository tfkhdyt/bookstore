package books

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
	booksServices "github.com/tfkhdyt/bookstore/api/services/books"
)

// GET /books
// Get all books
func (repo BooksRepository) FindAll(c *gin.Context) {
	var books []models.Book

	page := c.Query("page")
	limit := c.Query("limit")

	if page != "" && limit != "" {
		page, err := strconv.Atoi(page)
		if err != nil {
			log.Panicln(err.Error())
		}

		limit, err := strconv.Atoi(limit)
		if err != nil {
			log.Panicln(err.Error())
		}

		if err := booksServices.FindAllWithLimit(repo.DB, &books, page, limit); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		fmt.Println("Paginated books printed!")
		c.JSON(http.StatusOK, gin.H{
			"data":      books,
			"totalData": booksServices.GetTotalData(repo.DB),
		})
		return
	}

	if err := booksServices.FindAllWithoutLimit(repo.DB, &books); err != nil {
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
