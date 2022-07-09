package books

import (
	"github.com/tfkhdyt/bookstore/api/models"
	"gorm.io/gorm"
)

func FindAllBooksWithLimit(db *gorm.DB, books *[]models.Book, page int, limit int) error {
	return db.Limit(limit).Offset(limit * (page - 1)).Order("id ASC").Find(books).Error
}

func FindAllBooksWithoutLimit(db *gorm.DB, books *[]models.Book) error {
	return db.Order("id ASC").Find(books).Error
}

func GetTotalData(db *gorm.DB) (int, error) {
	var books []models.Book

	if err := db.Find(&books).Error; err != nil {
		return 0, err
	}

	return len(books), nil
}
