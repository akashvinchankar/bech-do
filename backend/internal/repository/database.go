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

	// Skip auto-migration since tables already exist in Supabase
	// You can enable this for fresh setups by uncommenting below:
	/*
		err = db.AutoMigrate(
			&models.User{},
			&models.Category{},
			&models.Product{},
			&models.Admin{},
		)
		if err != nil {
			log.Fatal("Failed to migrate database:", err)
		}
		log.Println("Database migration completed successfully")
	*/

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

	// Create default admin user
	var admin models.Admin
	result := db.Where("email = ?", "admin@bechdo.com").First(&admin)
	if result.Error != nil {
		// Hash password (you should use proper password hashing in production)
		defaultAdmin := models.Admin{
			Email:    "admin@bechdo.com",
			Password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: password
			Name:     "System Admin",
			Role:     "admin",
			IsActive: true,
		}
		db.Create(&defaultAdmin)
	}
}
