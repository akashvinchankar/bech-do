package handlers

import (
	"net/http"

	"bech-do-backend/internal/models"
	"bech-do-backend/internal/repository"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct{}

func NewCategoryHandler() *CategoryHandler {
	return &CategoryHandler{}
}

func (h *CategoryHandler) GetCategories(c *gin.Context) {
	var categories []models.Category
	result := repository.DB.Find(&categories)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories: " + result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"categories": categories})
}

func (h *CategoryHandler) GetCategoryStats(c *gin.Context) {
	var stats []struct {
		CategoryID   uint   `json:"category_id"`
		CategoryName string `json:"category_name"`
		ProductCount int64  `json:"product_count"`
	}

	result := repository.DB.Table("products").
		Select("categories.id as category_id, categories.name as category_name, COUNT(products.id) as product_count").
		Joins("JOIN categories ON products.category_id = categories.id").
		Where("products.status = ? AND categories.is_active = ?", models.ProductStatusAvailable, true).
		Group("categories.id, categories.name").
		Order("product_count DESC").
		Find(&stats)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch category stats"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"stats": stats})
}
