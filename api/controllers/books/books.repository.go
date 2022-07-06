package books

import "gorm.io/gorm"

type BooksRepository struct {
	DB *gorm.DB
}
