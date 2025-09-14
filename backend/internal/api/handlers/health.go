package handlers

import (
	"bech-do-backend/internal/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	// Test database connection
	sqlDB, err := repository.DB.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":   "error",
			"message":  "Database connection error",
			"database": "disconnected",
		})
		return
	}

	if err := sqlDB.Ping(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":   "error",
			"message":  "Database ping failed",
			"database": "disconnected",
		})
		return
	}

	// Get some basic stats
	var userCount int64
	var productCount int64
	var categoryCount int64

	repository.DB.Model(&struct{ ID uint }{}).Table("users").Count(&userCount)
	repository.DB.Model(&struct{ ID uint }{}).Table("products").Count(&productCount)
	repository.DB.Model(&struct{ ID uint }{}).Table("categories").Count(&categoryCount)

	c.JSON(http.StatusOK, gin.H{
		"status":   "ok",
		"message":  "Bech-Do API is running",
		"version":  "1.0.0",
		"database": "connected",
		"stats": gin.H{
			"users":      userCount,
			"products":   productCount,
			"categories": categoryCount,
		},
	})
}
