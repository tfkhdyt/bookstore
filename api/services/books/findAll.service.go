package books

import (
	"github.com/tfkhdyt/bookstore/api/models"
	"gorm.io/gorm"
)

func FindAllWithLimit(db *gorm.DB, books *[]models.Book, page int, limit int) error {
	return db.Limit(limit).Offset(limit * (page - 1)).Order("id ASC").Find(books).Error
}

func FindAllWithoutLimit(db *gorm.DB, books *[]models.Book) error {
	return db.Order("id ASC").Find(books).Error
}

func GetTotalData(db *gorm.DB) any {
	var books []models.Book

	if err := db.Find(&books).Error; err != nil {
		return err.Error()
	}

	return len(books)
}
