package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/db"
	"github.com/tfkhdyt/bookstore/api/repositories/books"
)

func main() {
	r := gin.Default()

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:3000"},
	// 	AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE"},
	// 	AllowHeaders:     []string{"Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	MaxAge:           12 * time.Hour,
	// }))

	r.Use(cors.Default())

	db, err := db.ConnectDatabase()

	if err != nil {
		log.Panic("Failed to connect to database!")
	}

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"data": "Hello world!",
		})
	})

	booksRepo := books.BooksRepository{DB: db}

	r.GET("/books", booksRepo.FindAll)
	r.GET("/books/:id", booksRepo.FindOne)
	r.POST("/books", booksRepo.CreateBook)
	r.PATCH("/books/:id", booksRepo.UpdateBook)
	r.DELETE("/books/:id", booksRepo.DeleteBook)

	r.Run()
}
