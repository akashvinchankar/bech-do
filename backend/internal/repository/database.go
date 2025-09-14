package repository

import (
	"bech-do-backend/internal/config"
	"bech-do-backend/internal/models"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDatabase() *gorm.DB {
	config := config.AppConfig

	if config.DatabaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	// Configure GORM logger
	var gormLogger logger.Interface
	if config.Environment == "production" {
		gormLogger = logger.Default.LogMode(logger.Error)
	} else {
		gormLogger = logger.Default.LogMode(logger.Info)
	}

	// Connect to database with Supabase-optimized settings
	db, err := gorm.Open(postgres.Open(config.DatabaseURL), &gorm.Config{
		Logger: gormLogger,
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Configure connection pool for Supabase
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get underlying sql.DB:", err)
	}

	// Set connection pool settings suitable for Supabase
	sqlDB.SetMaxOpenConns(10) // Supabase free tier has connection limits
	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetConnMaxLifetime(time.Hour)

	// Test the connection
	if err := sqlDB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Successfully connected to Supabase PostgreSQL database")

	// Skip auto-migration for existing database
	log.Println("Using existing database schema")

	// Seed default data (will skip if already exists)
	seedDefaultData(db)

	DB = db
	return db
}

func seedDefaultData(db *gorm.DB) {
	// Seed categories
	categories := []models.Category{
		{Name: "Electronics", Description: "Electronic devices and gadgets", Icon: "⚡"},
		{Name: "Furniture", Description: "Home and office furniture", Icon: "🪑"},
		{Name: "Clothing", Description: "Clothes and accessories", Icon: "👕"},
		{Name: "Books", Description: "Books and educational materials", Icon: "📚"},
		{Name: "Sports", Description: "Sports and fitness equipment", Icon: "⚽"},
		{Name: "Vehicles", Description: "Cars, bikes and other vehicles", Icon: "🚗"},
		{Name: "Home Appliances", Description: "Kitchen and household appliances", Icon: "🏠"},
		{Name: "Others", Description: "Miscellaneous items", Icon: "📦"},
	}

	for _, category := range categories {
		var existingCategory models.Category
		result := db.Where("name = ?", category.Name).First(&existingCategory)
		if result.Error != nil {
			// Category doesn't exist, create it
			db.Create(&category)
		}
	}

	// Create a demo user for frontend testing  
	var demoUser models.User  
	userResult := db.Where("email = ?", "admin@demo.com").First(&demoUser)
	if userResult.Error != nil {
		// Hash password: "password123" 
		hashedPassword := "$2a$10$3asPVkbBdudW8OF/Hrlrce7RM6vf5J31vp0p5Ld.7rTANahcQmJ.C" // password123
		defaultUser := models.User{
			Email:       "admin@demo.com",
			Password:    hashedPassword,
			Username:    "admin",
			FirstName:   "Admin",
			LastName:    "Demo", 
			PhoneNumber: "+91-9876543210",
			Address:     "Demo Address",
			City:        "Mumbai",
			State:       "Maharashtra",
			PinCode:     "400001",
			IsVerified:  false,
			IsActive:    true,
			Role:        models.UserRoleUser,
		}
		db.Create(&defaultUser)
		log.Println("Created demo user: admin@demo.com / password123")
	}
}
