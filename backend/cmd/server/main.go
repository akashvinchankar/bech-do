package main

import (
	"log"
	"net/http"
	"time"

	"bech-do-backend/internal/api/middleware"
	"bech-do-backend/internal/api/routes"
	"bech-do-backend/internal/config"
	"bech-do-backend/internal/repository"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()
	log.Printf("Starting Bech-Do API server in %s mode", cfg.Environment)

	// Initialize database
	repository.InitDatabase()
	log.Println("Database connected and migrated successfully")

	// Set Gin mode based on environment
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	router := gin.New()

	// Add middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORSMiddleware())

	// Setup routes
	routes.SetupRoutes(router)

	// Configure server
	server := &http.Server{
		Addr:           cfg.ServerHost + ":" + cfg.ServerPort,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1 MB
	}

	log.Printf("Server starting on http://%s:%s", cfg.ServerHost, cfg.ServerPort)
	log.Printf("Health check available at: http://%s:%s/health", cfg.ServerHost, cfg.ServerPort)
	log.Printf("API base URL: http://%s:%s/api/v1", cfg.ServerHost, cfg.ServerPort)

	// Start server
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("Server failed to start:", err)
	}
}
