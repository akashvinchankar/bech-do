package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Email       string   `json:"email" gorm:"uniqueIndex;not null"`
	Password    string   `json:"-" gorm:"not null"`
	Username    string   `json:"username" gorm:"uniqueIndex"`
	FirstName   string   `json:"firstName" gorm:"not null"`
	LastName    string   `json:"lastName" gorm:"not null"`
	PhoneNumber string   `json:"phone"`
	Address     string   `json:"address"`
	City        string   `json:"city"`
	State       string   `json:"state"`
	PinCode     string   `json:"pin_code"`
	IsVerified  bool     `json:"is_verified" gorm:"default:false"`
	IsActive    bool     `json:"is_active" gorm:"default:true"`
	Role        UserRole `json:"role" gorm:"default:'user'"`

	// Relationships
	Products []Product `json:"products,omitempty" gorm:"foreignKey:UserID"`
}

type UserRole string

const (
	UserRoleAdmin UserRole = "admin"
	UserRoleUser  UserRole = "user"
)

type Category struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Name        string `json:"name" gorm:"uniqueIndex;not null"`
	Slug        string `json:"slug" gorm:"uniqueIndex"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	IsActive    bool   `json:"isActive" gorm:"default:true"`

	// Relationships
	Products []Product `json:"products,omitempty" gorm:"foreignKey:CategoryID"`
}

type Product struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Title        string        `json:"title" gorm:"not null"`
	Description  string        `json:"description" gorm:"type:text"`
	Price        float64       `json:"price" gorm:"not null"`
	Images       []string      `json:"images" gorm:"serializer:json"`
	Condition    string        `json:"condition" gorm:"not null"`
	Status       ProductStatus `json:"status" gorm:"default:'available'"`
	Location     string        `json:"location"`
	IsNegotiable bool          `json:"is_negotiable" gorm:"default:false"`
	Views        int           `json:"viewsCount" gorm:"default:0"`
	IsSold       bool          `json:"isSold" gorm:"default:false"`
	IsActive     bool          `json:"isActive" gorm:"default:true"`
	SoldAt       *time.Time    `json:"soldAt,omitempty"`

	// Foreign Keys
	UserID     uint `json:"userId" gorm:"not null"`
	CategoryID uint `json:"categoryId" gorm:"not null"`

	// Relationships
	User     User     `json:"user,omitempty" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Category Category `json:"category,omitempty" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ProductStatus string

const (
	ProductStatusAvailable ProductStatus = "available"
	ProductStatusSold      ProductStatus = "sold"
	ProductStatusHidden    ProductStatus = "hidden"
)

type Admin struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	Email    string `json:"email" gorm:"uniqueIndex;not null"`
	Password string `json:"-" gorm:"not null"`
	Name     string `json:"name" gorm:"not null"`
	Role     string `json:"role" gorm:"default:'admin'"`
	IsActive bool   `json:"is_active" gorm:"default:true"`
}
