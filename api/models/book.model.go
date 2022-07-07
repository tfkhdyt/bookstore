package models

import "gorm.io/gorm"

type Book struct {
	// ID     uint   `json:"id" gorm:"primary_key"`
	gorm.Model
	Title         string `json:"title"`
	Author        string `json:"author"`
	ISBN          string `json:"isbn"`
	Description   string `json:"description"`
	Publisher     string `json:"publisher"`
	NumberOfPages uint   `json:"numberOfPages"`
	CoverImage    string `json:"coverImage"`
}
