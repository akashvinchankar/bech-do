# Bech-Do Backend API

A RESTful API built with Go and Gin framework for the Bech-Do marketplace application.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for marketplace items
- **Category System**: Organized product categories
- **Image Handling**: Support for multiple product images
- **Search & Filtering**: Advanced product search with filters
- **Admin Panel**: Administrative endpoints for management
- **Security**: Password hashing, JWT tokens, CORS protection

## Tech Stack

- **Go 1.24+** - Programming language
- **Gin** - Web framework
- **GORM** - ORM for database operations
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Products

- `GET /api/v1/products` - Get all products (with filtering)
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product (authenticated)
- `PUT /api/v1/products/:id` - Update product (authenticated)
- `DELETE /api/v1/products/:id` - Delete product (authenticated)
- `GET /api/v1/my-products` - Get user's products (authenticated)

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/stats` - Get category statistics

### User Profile

- `GET /api/v1/user/profile` - Get user profile (authenticated)
- `PUT /api/v1/user/profile` - Update user profile (authenticated)
- `PUT /api/v1/user/change-password` - Change password (authenticated)

### Admin (Admin only)

- `GET /api/v1/admin/users` - Manage users
- `GET /api/v1/admin/products` - Manage products
- `GET /api/v1/admin/dashboard` - Dashboard stats

### Health Check

- `GET /health` - API health status

## Database Schema

### Users Table

- ID, Email, Password (hashed)
- Personal info: FirstName, LastName, Phone, Address, City, State, PinCode
- Status: IsVerified, IsActive, Role

### Products Table

- ID, Title, Description, Price, Images (JSON array)
- Metadata: Condition, Status, Location, IsNegotiable, Views
- Relations: UserID, CategoryID

### Categories Table

- ID, Name, Description, Icon, IsActive

### Admins Table

- ID, Email, Password, Name, Role, IsActive

## Getting Started

### Prerequisites

- Go 1.24 or higher
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bech-do/backend
   ```

2. **Install dependencies**

   ```bash
   go mod download
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Setup PostgreSQL database**

   ```sql
   CREATE DATABASE bech_do_db;
   ```

5. **Run database migrations**
   ```bash
   # Migrations will run automatically on startup
   go run cmd/server/main.go
   ```

### Running the Server

**Development mode:**

```bash
go run cmd/server/main.go
```

**Production build:**

```bash
go build -o bin/server cmd/server/main.go
./bin/server
```

The server will start on `http://localhost:8080`

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=postgres://user:password@localhost:5432/bech_do_db?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key
SERVER_PORT=8080
SERVER_HOST=localhost
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
ENV=development
```

## API Usage Examples

### Register a new user

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a product

```bash
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "iPhone 12 Pro",
    "description": "Excellent condition iPhone",
    "price": 599.99,
    "images": ["https://example.com/image1.jpg"],
    "condition": "excellent",
    "location": "New York, NY",
    "is_negotiable": true,
    "category_id": 1
  }'
```

### Get products with filters

```bash
curl "http://localhost:8080/api/v1/products?search=iphone&category=Electronics&min_price=100&max_price=1000&page=1&limit=12"
```

## Project Structure

```
backend/
├── cmd/server/          # Application entry point
├── internal/
│   ├── api/
│   │   ├── handlers/    # HTTP request handlers
│   │   ├── middleware/  # HTTP middleware
│   │   └── routes/      # Route definitions
│   ├── config/          # Configuration management
│   ├── models/          # Database models
│   ├── repository/      # Database layer
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── migrations/          # Database migrations
├── .env                 # Environment variables
├── .env.example         # Environment template
├── go.mod              # Go modules
└── README.md           # This file
```

## Default Data

The application seeds the following default data:

**Categories:**

- Electronics, Furniture, Clothing, Books, Sports, Vehicles, Home Appliances, Others

**Default Admin:**

- Email: `admin@bechdo.com`
- Password: `password`

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for frontend integration
- **Input Validation**: Request validation using Gin binding
- **SQL Injection Prevention**: GORM provides built-in protection

## Deployment

### Using Docker (Coming Soon)

```bash
docker build -t bech-do-api .
docker run -p 8080:8080 bech-do-api
```

### Manual Deployment

1. Build the binary: `go build -o server cmd/server/main.go`
2. Set production environment variables
3. Deploy to your preferred platform (Railway, Heroku, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
