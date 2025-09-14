package routes

import (
	"bech-do-backend/internal/api/handlers"
	"bech-do-backend/internal/api/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Initialize handlers
	authHandler := handlers.NewAuthHandler()
	productHandler := handlers.NewProductHandler()
	categoryHandler := handlers.NewCategoryHandler()
	healthHandler := handlers.NewHealthHandler()

	// Health check
	r.GET("/health", healthHandler.HealthCheck)

	// API v1 routes
	v1 := r.Group("/api/v1")

	// Public routes
	public := v1.Group("/")
	{
		// Auth routes
		auth := public.Group("auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		// Product routes (public)
		products := public.Group("products")
		{
			products.GET("/", productHandler.GetProducts)
			products.GET("/:id", productHandler.GetProduct)
		}

		// Category routes
		categories := public.Group("categories")
		{
			categories.GET("/", categoryHandler.GetCategories)
			categories.GET("/stats", categoryHandler.GetCategoryStats)
		}
	}

	// Protected routes (require authentication)
	protected := v1.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// User profile routes
		user := protected.Group("user")
		{
			user.GET("/profile", authHandler.GetProfile)
			user.PUT("/profile", authHandler.UpdateProfile)
			user.PUT("/change-password", authHandler.ChangePassword)
		}

		// Product routes (protected)
		products := protected.Group("products")
		{
			products.POST("/", productHandler.CreateProduct)
			products.PUT("/:id", productHandler.UpdateProduct)
			products.DELETE("/:id", productHandler.DeleteProduct)
		}

		// My products
		myProducts := protected.Group("my-products")
		{
			myProducts.GET("/", productHandler.GetMyProducts)
		}
	}

	// Admin routes (require admin role)
	admin := v1.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	admin.Use(middleware.AdminMiddleware())
	{
		admin.GET("/users", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Admin users endpoint - coming soon"})
		})

		admin.GET("/products", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Admin products endpoint - coming soon"})
		})

		admin.GET("/dashboard", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Admin dashboard endpoint - coming soon"})
		})
	}
}
