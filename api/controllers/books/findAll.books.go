package books

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/models"
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

		if err := repo.DB.Limit(limit).Offset(limit * (page - 1)).Order("id ASC").Find(&books).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		fmt.Println("Paginated books printed!")
		c.JSON(http.StatusOK, gin.H{
			"data":      books,
			"totalData": repo.getTotalData(),
		})
		return
	}

	if err := repo.DB.Find(&books).Order("id ASC").Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// query checking
	// var filteredBooks []models.Book
	// fmt.Println(c.Queries)
	// if c.Query("title") != "" {
	// 	for _, book := range books {
	// 		if strings.Contains(strings.ToLower(book.Title), strings.ToLower(c.Query("title"))) {
	// 			filteredBooks = append(filteredBooks, book)
	// 		}
	// 	}
	// }
	// if c.Query("author") != "" {
	// 	for _, book := range books {
	// 		if strings.Contains(strings.ToLower(book.Author), strings.ToLower(c.Query("author"))) {
	// 			filteredBooks = append(filteredBooks, book)
	// 		}
	// 	}
	// }
	// if c.Query("isbn") != "" {
	// 	for _, book := range books {
	// 		if strings.Contains(strings.ToLower(book.ISBN), strings.ToLower(c.Query("isbn"))) {
	// 			filteredBooks = append(filteredBooks, book)
	// 		}
	// 	}
	// }
	// if c.Query("publisher") != "" {
	// 	for _, book := range books {
	// 		if strings.Contains(strings.ToLower(book.Publisher), strings.ToLower(c.Query("publisher"))) {
	// 			filteredBooks = append(filteredBooks, book)
	// 		}
	// 	}
	// }
	// if c.Query("numberOfPages") != "" {
	// 	numberOfPages, err := strconv.ParseInt(c.Query("numberOfPages"), 10, 64)
	// 	if err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{
	// 			"error": err.Error(),
	// 		})
	// 	}
	// 	for _, book := range books {
	// 		if book.NumberOfPages == uint(numberOfPages) {
	// 			filteredBooks = append(filteredBooks, book)
	// 		}
	// 	}
	// }

	// if len(filteredBooks) > 0 {
	// 	fmt.Println("Filtered books printed!")
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"data": filteredBooks,
	// 	})
	// 	return
	// }

	fmt.Println("All books printed!")
	c.JSON(http.StatusOK, gin.H{
		"data": books,
	})
}

func (repo BooksRepository) getTotalData() any {
	var books []models.Book

	if err := repo.DB.Find(&books).Error; err != nil {
		return err.Error()
	}

	return len(books)
}
