package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL        string
	SupabaseURL        string
	SupabaseAnonKey    string
	SupabaseServiceKey string
	JWTSecret          string
	ServerPort         string
	ServerHost         string
	CloudinaryName     string
	CloudinaryKey      string
	CloudinarySecret   string
	FrontendURL        string
	Environment        string
}

var AppConfig *Config

func LoadConfig() *Config {
	// Load .env file in development
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found")
		}
	}

	config := &Config{
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		SupabaseURL:        getEnv("SUPABASE_URL", ""),
		SupabaseAnonKey:    getEnv("SUPABASE_ANON_KEY", ""),
		SupabaseServiceKey: getEnv("SUPABASE_SERVICE_ROLE_KEY", ""),
		JWTSecret:          getEnv("JWT_SECRET", "fallback-secret-key"),
		ServerPort:         getEnv("SERVER_PORT", "8080"),
		ServerHost:         getEnv("SERVER_HOST", "localhost"),
		CloudinaryName:     getEnv("CLOUDINARY_CLOUD_NAME", ""),
		CloudinaryKey:      getEnv("CLOUDINARY_API_KEY", ""),
		CloudinarySecret:   getEnv("CLOUDINARY_API_SECRET", ""),
		FrontendURL:        getEnv("FRONTEND_URL", "http://localhost:3000"),
		Environment:        getEnv("ENV", "development"),
	}

	AppConfig = config
	return config
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
