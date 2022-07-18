package books

import (
	"fmt"

	"github.com/tfkhdyt/bookstore/api/models"
	"gorm.io/gorm"
)

func FindAllBooksWithLimit(db *gorm.DB, books *[]models.Book, page int, limit int) error {
	return db.Limit(limit).Offset(limit * (page - 1)).Order("id ASC").Find(books).Error
}

func FindAllBooksWithoutLimit(db *gorm.DB, books *[]models.Book) error {
	return db.Order("id ASC").Find(books).Error
}

func FindAllBooksByQuery(db *gorm.DB, books *[]models.Book, query string, value string) error {
	fmt.Printf("Query by %s with value %s\n", query, value)
	queryString := fmt.Sprintf("%s ILIKE ?", query)
	return db.Where(queryString, "%"+value+"%").Order("id ASC").Find(books).Error
}

func FindAllBooksByQueryWithPagination(db *gorm.DB, books *[]models.Book, query string, value string, page int, limit int) error {
	fmt.Printf("Query by %s with value %s\n", query, value)
	queryString := fmt.Sprintf("%s ILIKE ?", query)
	return db.Where(queryString, "%"+value+"%").Limit(limit).Offset(limit * (page - 1)).Order("id ASC").Find(books).Error
}

func GetTotalData(db *gorm.DB) (int, error) {
	var books []models.Book

	if err := db.Find(&books).Error; err != nil {
		return 0, err
	}

	return len(books), nil
}

func GetTotalDataByQuery(db *gorm.DB, query string, value string) (int, error) {
	var books []models.Book
	queryString := fmt.Sprintf("%s ILIKE ?", query)

	if err := db.Where(queryString, "%"+value+"%").Find(&books).Error; err != nil {
		return 0, err
	}

	return len(books), nil
}
