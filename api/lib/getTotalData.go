package lib

import "github.com/tfkhdyt/bookstore/api/models"

func GetTotalData() any {
	var books []models.Book

	if err := models.DB.Find(&books).Error; err != nil {
		return err.Error()
	}

	return len(books)
}
