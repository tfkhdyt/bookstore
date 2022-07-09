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

// DELETE /books/:id
func (repo BooksRepository) DeleteBook(c *gin.Context) {
	var book models.Book
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Fatalln(err.Error())
		return
	}

	if err := booksServices.FindBook(repo.DB, &book, id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := booksServices.DeleteBook(repo.DB, &book); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Book with id %v deleted successfully", c.Param("id")),
	})
}
