package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tfkhdyt/bookstore/api/controllers"
	"github.com/tfkhdyt/bookstore/api/models"
)

func main() {
	r := gin.Default()

	models.ConnectDatabase()

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"data": "Hello world!",
		})
	})

	r.GET("/books", controllers.FindBooks)
	r.GET("/books/:id", controllers.FindBook)
	r.POST("/books", controllers.CreateBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id", controllers.DeleteBook)

	r.Run()
}
