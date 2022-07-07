package books

import (
	"github.com/tfkhdyt/bookstore/api/models"
	"gorm.io/gorm"
)

func FindBook(db *gorm.DB, book *models.Book, id int) error {
	return db.First(book, id).Error
}
