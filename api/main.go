package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/controllers/books"
	"github.com/tfkhdyt/bookstore/api/models"
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

	models.ConnectDatabase()

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"data": "Hello world!",
		})
	})

	r.GET("/books", books.FindAll)
	r.GET("/books/:id", books.FindOne)
	r.POST("/books", books.CreateBook)
	r.PATCH("/books/:id", books.UpdateBook)
	r.DELETE("/books/:id", books.DeleteBook)

	r.Run()
}
