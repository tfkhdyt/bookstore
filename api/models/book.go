package models

import "time"

type Book struct {
	// ID     uint   `json:"id" gorm:"primary_key"`
	// gorm.Model
	ID            uint      `json:"id" gorm:"primary_key"`
	Title         string    `json:"title"`
	Author        string    `json:"author"`
	ISBN          string    `json:"isbn"`
	Description   string    `json:"description"`
	Publisher     string    `json:"publisher"`
	NumberOfPages uint      `json:"numberOfPages"`
	CoverImage    string    `json:"coverImage"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}
