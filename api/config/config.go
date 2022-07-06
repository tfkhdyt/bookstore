package config

import (
	"os"

	"github.com/joho/godotenv"
)

func GetDBInfo() (string, string, string, string) {
	godotenv.Load()

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPwd := os.Getenv("DB_PWD")
	dbName := os.Getenv("DB_NAME")

	return dbHost, dbUser, dbPwd, dbName
}
