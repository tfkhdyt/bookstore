package models

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// _ "github.com/jinzhu/gorm/dialects/sqlite"
)

var DB *gorm.DB

func ConnectDatabase() {
	godotenv.Load()

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPwd := os.Getenv("DB_PWD")
	dbName := os.Getenv("DB_NAME")

	fmt.Println(dbHost, dbUser, dbPwd, dbName)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Jakarta", dbHost, dbUser, dbPwd, dbName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	// database, err := gorm.Open("sqlite3", "test.db")

	if err != nil {
		log.Fatal("Failed to connect to database!")
		return
	}

	db.AutoMigrate(&Book{})

	DB = db
}
