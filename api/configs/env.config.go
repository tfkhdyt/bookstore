package configs

import (
	"os"

	"github.com/joho/godotenv"
)

func GetDBInfo() (dbHost string, dbUser string, dbPwd string, dbName string, dbSsl string) {
	godotenv.Load()

	dbHost = os.Getenv("DB_HOST")
	dbUser = os.Getenv("DB_USER")
	dbPwd = os.Getenv("DB_PWD")
	dbName = os.Getenv("DB_NAME")
	dbSsl = os.Getenv("DB_SSL")

	return
}
