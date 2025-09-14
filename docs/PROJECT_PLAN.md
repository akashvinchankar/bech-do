# Bech-Do: Old Items Marketplace Project Plan

## Project Overview

A full-stack web application where users can sell old household items by uploading images and descriptions. The platform includes user authentication, admin panel, and inventory management.

## Technology Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Authentication**: NextAuth.js v5
- **Image Upload**: Cloudinary
- **Forms**: React Hook Form + Zod validation

### Backend

- **Language**: Go (Golang)
- **Framework**: Gin Web Framework
- **Authentication**: JWT tokens
- **Database ORM**: GORM
- **Image Processing**: Go image libraries
- **CORS**: gin-cors middleware
- **Environment**: godotenv

### Database

- **Primary Database**: PostgreSQL (Free tier on Supabase)
- **Alternative**: MongoDB Atlas (Free tier)

### File Storage

- **Images**: Cloudinary (Free tier - 25GB storage)
- **Alternative**: Supabase Storage

### Hosting

- **Frontend**: Vercel (Free tier)
- **Backend**: Railway (Free tier) or Render (Free tier)
- **Database**: Supabase (Free tier)

## Project Structure

```
bech-do/
├── frontend/                          # Next.js application
│   ├── public/
│   │   ├── images/
│   │   ├── favicon.ico
│   │   └── logo.png
│   ├── src/
│   │   ├── app/                       # App Router structure
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── admin/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── users/
│   │   │   │   │   ├── products/
│   │   │   │   │   └── analytics/
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── my-ads/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   │       └── [...nextauth]/
│   │   │   │           └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── category/
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── sell/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── components/
│   │   │   ├── ui/                    # Shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   └── ...
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.tsx
│   │   │       ├── UserTable.tsx
│   │   │       ├── ProductTable.tsx
│   │   │       └── Analytics.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts              # NextAuth configuration
│   │   │   ├── api.ts               # API client
│   │   │   ├── utils.ts             # Utility functions
│   │   │   ├── validations.ts       # Zod schemas
│   │   │   └── cloudinary.ts        # Image upload config
│   │   ├── store/
│   │   │   ├── authStore.ts         # Authentication state
│   │   │   ├── productStore.ts      # Product state
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   ├── product.ts
│   │   │   └── api.ts
│   │   └── hooks/
│   │       ├── useAuth.ts
│   │       ├── useProducts.ts
│   │       └── useUpload.ts
│   ├── .env.local
│   ├── .env.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── components.json              # Shadcn/ui config
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                         # Go backend
│   ├── cmd/
│   │   └── server/
│   │       └── main.go             # Application entry point
│   ├── internal/
│   │   ├── api/
│   │   │   ├── handlers/           # HTTP handlers
│   │   │   │   ├── auth.go
│   │   │   │   ├── users.go
│   │   │   │   ├── products.go
│   │   │   │   ├── admin.go
│   │   │   │   └── upload.go
│   │   │   ├── middleware/         # Custom middleware
│   │   │   │   ├── auth.go
│   │   │   │   ├── cors.go
│   │   │   │   ├── logging.go
│   │   │   │   └── admin.go
│   │   │   └── routes/
│   │   │       └── routes.go       # Route definitions
│   │   ├── models/                 # Database models
│   │   │   ├── user.go
│   │   │   ├── product.go
│   │   │   ├── category.go
│   │   │   └── admin.go
│   │   ├── services/               # Business logic
│   │   │   ├── auth.go
│   │   │   ├── user.go
│   │   │   ├── product.go
│   │   │   ├── admin.go
│   │   │   └── upload.go
│   │   ├── repository/             # Database layer
│   │   │   ├── user.go
│   │   │   ├── product.go
│   │   │   └── interfaces.go
│   │   ├── config/
│   │   │   ├── database.go         # DB configuration
│   │   │   ├── config.go           # App configuration
│   │   │   └── jwt.go              # JWT configuration
│   │   └── utils/
│   │       ├── response.go         # API response helpers
│   │       ├── validation.go       # Input validation
│   │       ├── jwt.go             # JWT utilities
│   │       └── upload.go          # File upload utilities
│   ├── migrations/                 # Database migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_categories.sql
│   │   ├── 003_create_products.sql
│   │   └── 004_create_admin.sql
│   ├── .env
│   ├── .env.example
│   ├── go.mod
│   ├── go.sum
│   ├── Dockerfile
│   └── README.md
│
├── database/                       # Database scripts and schemas
│   ├── schema.sql
│   ├── seeds.sql
│   └── migrations/
│
├── docs/                          # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── DATABASE_SCHEMA.md
│   └── SETUP.md
│
├── docker-compose.yml             # Local development
├── .gitignore
└── README.md
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15),
    profile_image VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    condition VARCHAR(50) CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
    images TEXT[], -- Array of image URLs
    location VARCHAR(100),
    is_sold BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sold_at TIMESTAMP
);
```

### Admin Table

```sql
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'admin',
    permissions TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Product Views Table (for analytics)

```sql
CREATE TABLE product_views (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register        # User registration
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
POST   /api/auth/refresh         # Refresh JWT token
POST   /api/auth/forgot-password # Forgot password
POST   /api/auth/reset-password  # Reset password
GET    /api/auth/me              # Get current user info
```

### User Endpoints

```
GET    /api/users/profile        # Get user profile
PUT    /api/users/profile        # Update user profile
POST   /api/users/upload-avatar  # Upload profile image
GET    /api/users/:id/products   # Get user's products
```

### Product Endpoints

```
GET    /api/products             # Get all products (with pagination, filters)
GET    /api/products/:id         # Get specific product
POST   /api/products             # Create new product (authenticated)
PUT    /api/products/:id         # Update product (owner only)
DELETE /api/products/:id         # Delete product (owner only)
POST   /api/products/:id/view    # Track product view
GET    /api/products/search      # Search products
GET    /api/products/categories  # Get products by category
```

### Category Endpoints

```
GET    /api/categories           # Get all categories
GET    /api/categories/:slug     # Get category by slug
```

### Admin Endpoints

```
GET    /api/admin/dashboard      # Admin dashboard data
GET    /api/admin/users          # Get all users
PUT    /api/admin/users/:id      # Update user status
DELETE /api/admin/users/:id      # Delete user
GET    /api/admin/products       # Get all products
PUT    /api/admin/products/:id   # Update product status
DELETE /api/admin/products/:id   # Delete product
GET    /api/admin/analytics      # Get analytics data
```

### Upload Endpoints

```
POST   /api/upload/image         # Upload single image
POST   /api/upload/images        # Upload multiple images
DELETE /api/upload/image         # Delete image
```

## Implementation Steps

### Phase 1: Backend Setup (Week 1)

#### Step 1: Initialize Go Project

```bash
mkdir backend
cd backend
go mod init bech-do-backend
```

#### Step 2: Install Dependencies

```bash
go get github.com/gin-gonic/gin
go get github.com/golang-jwt/jwt/v5
go get gorm.io/gorm
go get gorm.io/driver/postgres
go get github.com/joho/godotenv
go get golang.org/x/crypto/bcrypt
go get github.com/gin-contrib/cors
```

#### Step 3: Database Setup

- Create Supabase account
- Set up PostgreSQL database
- Run migrations
- Seed initial data (categories)

#### Step 4: Implement Core Backend Features

- Authentication system with JWT
- User management
- Product CRUD operations
- Image upload handling
- Admin functionality

### Phase 2: Frontend Setup (Week 2)

#### Step 1: Initialize Next.js Project

```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint --app
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install next-auth@beta
npm install zustand
npm install react-hook-form @hookform/resolvers zod
npm install axios
npm install cloudinary
npm install @types/node
npx shadcn@latest init
npx shadcn@latest add button input card dialog form textarea select
```

#### Step 4: Implement Frontend Features

- Authentication pages and components
- Product listing and detail pages
- Product creation/edit forms
- Image upload functionality
- User dashboard
- Admin panel

### Phase 3: Integration & Testing (Week 3)

#### Step 1: API Integration

- Connect frontend to backend APIs
- Implement error handling
- Add loading states
- Implement search and filters

#### Step 2: Authentication Flow

- Setup NextAuth.js with custom provider
- Implement protected routes
- Add role-based access control

#### Step 3: Image Upload

- Configure Cloudinary
- Implement image optimization
- Add image preview and cropping

### Phase 4: Deployment (Week 4)

#### Step 1: Backend Deployment (Railway/Render)

1. Create account on Railway or Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy backend service

#### Step 2: Frontend Deployment (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment variables
3. Configure build settings
4. Deploy frontend

#### Step 3: Database Migration

- Run production migrations
- Seed production data
- Test database connections

## Environment Variables

### Backend (.env)

```env
PORT=8080
DB_HOST=your_supabase_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Free Hosting Options

### Backend Hosting

1. **Railway** (Recommended)

   - Free tier: 500 hours/month
   - Easy deployment from GitHub
   - Built-in PostgreSQL addon

2. **Render**

   - Free tier with limitations
   - Auto-deploy from GitHub
   - Built-in environment management

3. **Heroku**
   - Free tier discontinued
   - Paid plans start at $7/month

### Frontend Hosting

1. **Vercel** (Recommended)

   - Unlimited free deployments
   - Auto-deploy from GitHub
   - Excellent Next.js support

2. **Netlify**
   - Free tier with good features
   - Easy static site deployment

### Database Options

1. **Supabase** (Recommended)

   - Free PostgreSQL database
   - Built-in authentication
   - Storage for images

2. **MongoDB Atlas**

   - Free tier: 512MB storage
   - Good for document-based data

3. **PlanetScale**
   - Free MySQL database
   - Branching workflow

### Image Storage

1. **Cloudinary** (Recommended)

   - 25GB free storage
   - Image optimization
   - CDN delivery

2. **Supabase Storage**
   - 1GB free storage
   - Integrated with Supabase DB

## Security Considerations

### Backend Security

- JWT token expiration and refresh
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- SQL injection prevention with GORM

### Frontend Security

- Secure cookie handling
- XSS prevention
- CSRF protection with NextAuth
- Environment variable security
- Image upload validation

## Performance Optimization

### Backend

- Database indexing on frequently queried fields
- Pagination for large datasets
- Image compression before storage
- Caching with Redis (future enhancement)

### Frontend

- Next.js Image optimization
- Lazy loading for product images
- Code splitting
- Caching strategies

## Testing Strategy

### Backend Testing

- Unit tests for services and handlers
- Integration tests for API endpoints
- Database migration tests

### Frontend Testing

- Component unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright (optional)

## Monitoring and Analytics

### Application Monitoring

- Error tracking with Sentry (free tier)
- Performance monitoring
- User analytics with Google Analytics

### Database Monitoring

- Query performance monitoring
- Connection pool monitoring
- Database backup strategies

## Future Enhancements

### Phase 2 Features

- Real-time chat between buyer and seller
- Payment integration (Stripe)
- Email notifications
- Mobile app with React Native
- Advanced search with Elasticsearch

### Admin Features

- Advanced analytics dashboard
- Bulk operations
- Content moderation tools
- Revenue tracking

This comprehensive plan provides a roadmap for building your old items marketplace from scratch to deployment, using free tier services wherever possible while maintaining scalability for future growth.
