package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"bech-do-backend/internal/models"
	"bech-do-backend/internal/repository"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProductHandler struct{}

func NewProductHandler() *ProductHandler {
	return &ProductHandler{}
}

type CreateProductRequest struct {
	Title        string   `json:"title" binding:"required"`
	Description  string   `json:"description" binding:"required"`
	Price        float64  `json:"price" binding:"required,min=0"`
	Images       []string `json:"images" binding:"required,min=1"`
	Condition    string   `json:"condition" binding:"required"`
	Location     string   `json:"location" binding:"required"`
	IsNegotiable bool     `json:"is_negotiable"`
	CategoryID   uint     `json:"category_id" binding:"required"`
}

type UpdateProductRequest struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Price        float64  `json:"price" binding:"min=0"`
	Images       []string `json:"images"`
	Condition    string   `json:"condition"`
	Location     string   `json:"location"`
	IsNegotiable bool     `json:"is_negotiable"`
	CategoryID   uint     `json:"category_id"`
	Status       string   `json:"status"`
}

func (h *ProductHandler) CreateProduct(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var req CreateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify category exists
	var category models.Category
	result := repository.DB.First(&category, req.CategoryID)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	// Create product
	userIDUint := userID.(uint)
	product := models.Product{
		Title:        req.Title,
		Description:  req.Description,
		Price:        req.Price,
		Images:       req.Images,
		Condition:    req.Condition,
		Location:     req.Location,
		IsNegotiable: req.IsNegotiable,
		Status:       models.ProductStatusAvailable,
		UserID:       userIDUint,
		CategoryID:   req.CategoryID,
		Views:        0,
	}

	if err := repository.DB.Create(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
		return
	}

	// Load relationships
	repository.DB.Preload("User").Preload("Category").First(&product, product.ID)

	c.JSON(http.StatusCreated, gin.H{"product": product})
}

func (h *ProductHandler) GetProducts(c *gin.Context) {
	// Query parameters
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "12"))
	search := c.Query("search")
	category := c.Query("category")
	condition := c.Query("condition")
	minPrice, _ := strconv.ParseFloat(c.Query("min_price"), 64)
	maxPrice, _ := strconv.ParseFloat(c.Query("max_price"), 64)
	sortBy := c.DefaultQuery("sort", "created_at")
	order := c.DefaultQuery("order", "desc")

	// Calculate offset
	offset := (page - 1) * limit

	// Build query
	query := repository.DB.Model(&models.Product{}).
		Where("status = ?", models.ProductStatusAvailable).
		Preload("User").
		Preload("Category")

	// Apply filters
	if search != "" {
		searchTerm := "%" + strings.ToLower(search) + "%"
		query = query.Where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", searchTerm, searchTerm)
	}

	if category != "" {
		query = query.Joins("JOIN categories ON products.category_id = categories.id").
			Where("categories.name = ?", category)
	}

	if condition != "" {
		query = query.Where("condition = ?", condition)
	}

	if minPrice > 0 {
		query = query.Where("price >= ?", minPrice)
	}

	if maxPrice > 0 {
		query = query.Where("price <= ?", maxPrice)
	}

	// Count total results
	var total int64
	query.Count(&total)

	// Apply sorting and pagination
	var products []models.Product
	result := query.Order(sortBy + " " + order).
		Limit(limit).
		Offset(offset).
		Find(&products)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}

	// Calculate pagination info
	totalPages := int((total + int64(limit) - 1) / int64(limit))
	hasNext := page < totalPages
	hasPrev := page > 1

	c.JSON(http.StatusOK, gin.H{
		"products": products,
		"pagination": gin.H{
			"current_page": page,
			"total_pages":  totalPages,
			"total_count":  total,
			"has_next":     hasNext,
			"has_prev":     hasPrev,
		},
	})
}

func (h *ProductHandler) GetProduct(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	var product models.Product
	result := repository.DB.Preload("User").Preload("Category").First(&product, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Increment view count
	repository.DB.Model(&product).Update("views", gorm.Expr("views + 1"))
	product.Views++

	c.JSON(http.StatusOK, gin.H{"product": product})
}

func (h *ProductHandler) UpdateProduct(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	var req UpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find product and verify ownership
	var product models.Product
	result := repository.DB.First(&product, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	userIDUint := userID.(uint)
	if product.UserID != userIDUint {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own products"})
		return
	}

	// Update product fields
	updates := make(map[string]interface{})
	if req.Title != "" {
		updates["title"] = req.Title
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}
	if req.Price >= 0 {
		updates["price"] = req.Price
	}
	if len(req.Images) > 0 {
		updates["images"] = req.Images
	}
	if req.Condition != "" {
		updates["condition"] = req.Condition
	}
	if req.Location != "" {
		updates["location"] = req.Location
	}
	updates["is_negotiable"] = req.IsNegotiable
	if req.CategoryID > 0 {
		updates["category_id"] = req.CategoryID
	}
	if req.Status != "" {
		updates["status"] = req.Status
	}

	// Update product
	result = repository.DB.Model(&product).Updates(updates)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update product"})
		return
	}

	// Load updated product with relationships
	repository.DB.Preload("User").Preload("Category").First(&product, id)

	c.JSON(http.StatusOK, gin.H{"product": product})
}

func (h *ProductHandler) DeleteProduct(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	// Find product and verify ownership
	var product models.Product
	result := repository.DB.First(&product, id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	userIDUint := userID.(uint)
	userRole, _ := c.Get("user_role")
	if product.UserID != userIDUint && userRole != string(models.UserRoleAdmin) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own products"})
		return
	}

	// Soft delete product
	result = repository.DB.Delete(&product)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

func (h *ProductHandler) GetMyProducts(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Query parameters
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "12"))
	status := c.Query("status")

	// Calculate offset
	offset := (page - 1) * limit

	// Build query
	query := repository.DB.Model(&models.Product{}).
		Where("user_id = ?", userID).
		Preload("Category")

	if status != "" {
		query = query.Where("status = ?", status)
	}

	// Count total results
	var total int64
	query.Count(&total)

	// Get products
	var products []models.Product
	result := query.Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&products)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}

	// Calculate pagination info
	totalPages := int((total + int64(limit) - 1) / int64(limit))
	hasNext := page < totalPages
	hasPrev := page > 1

	c.JSON(http.StatusOK, gin.H{
		"products": products,
		"pagination": gin.H{
			"current_page": page,
			"total_pages":  totalPages,
			"total_count":  total,
			"has_next":     hasNext,
			"has_prev":     hasPrev,
		},
	})
}
