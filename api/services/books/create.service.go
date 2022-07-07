package books

import (
	"github.com/tfkhdyt/bookstore/api/models"
	"gorm.io/gorm"
)

func CreateBook(db *gorm.DB, book *models.Book) error {
	return db.Create(book).Error
}
