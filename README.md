# Bech-Do Marketplace 🛒

A modern, full-stack marketplace application built with Next.js 15 and Go, allowing users to buy and sell household items with ease.

![Bech-Do Logo](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=300&fit=crop&crop=center)

## 🚀 Features

### For Buyers
- **Browse Products**: Explore thousands of quality pre-owned items
- **Smart Search**: Filter by category, price, condition, and location
- **Product Details**: Comprehensive product pages with image galleries
- **Seller Profiles**: View seller ratings and contact information
- **Secure Communication**: Chat with sellers directly through the platform

### For Sellers
- **Easy Listing**: Create product listings with multiple images
- **Category Management**: Organize products across 8+ categories
- **Price Management**: Set fixed or negotiable prices
- **Inventory Tracking**: Monitor views and manage listings
- **Dashboard**: Personal seller dashboard with analytics

### Platform Features
- **User Authentication**: Secure JWT-based authentication
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- **Real-time Updates**: Live product status and availability
- **Safety Features**: Built-in safety tips and secure transactions
- **Admin Panel**: Complete admin control for platform management

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Image Handling**: Next.js Image with Unsplash integration
- **UI Components**: Custom components with glass morphism design

### Backend  
- **Language**: Go 1.24
- **Framework**: Gin HTTP framework
- **Database**: PostgreSQL (Supabase)
- **ORM**: GORM with auto-migrations
- **Authentication**: JWT tokens with 24-hour expiration
- **Security**: bcrypt password hashing, CORS middleware

### Database
- **Provider**: Supabase (PostgreSQL)
- **Features**: Real-time subscriptions, Row Level Security
- **Tables**: Users, Products, Categories, Admins
- **Storage**: Supabase Storage for file uploads

### DevOps
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Railway/Render
- **Database**: Supabase Cloud
- **Version Control**: Git/GitHub

## 📦 Project Structure

```
bech-do/
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Go Backend
│   ├── cmd/server/          # Application entry point
│   ├── internal/            # Internal packages
│   │   ├── api/            # HTTP handlers & routes
│   │   ├── config/         # Configuration management
│   │   ├── models/         # Data models
│   │   └── repository/     # Database layer
│   ├── migrations/          # Database migrations
│   └── go.mod
├── PROJECT_PLAN.md          # Detailed project plan
├── SETUP_GUIDE.md           # Setup instructions
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Go 1.21+
- Supabase account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/bech-do.git
cd bech-do
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
go mod download
go run cmd/server/main.go
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

### 4. Database Setup
The backend automatically handles database migrations and seeding on startup.

## 🔧 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret_key
SERVER_HOST=localhost
SERVER_PORT=8080
ENVIRONMENT=development
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📱 Screenshots

### Home Page
Modern landing page with hero section and featured products.

### Product Listing
Grid layout with uniform cards showing product images, prices, and details.

### Product Details
Comprehensive product page with image gallery, seller info, and contact options.

### Create Listing
Simple form for sellers to add new products with image upload.

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Login**: JWT tokens issued for authenticated sessions
3. **Authorization**: Protected routes require valid tokens
4. **Profile Management**: Users can update profiles and change passwords

## 🎨 Design System

- **Color Palette**: Blue to purple gradients with green accents
- **Typography**: Modern, clean fonts with proper hierarchy
- **Components**: Glass morphism effects with subtle shadows
- **Icons**: Lucide React icons throughout the interface
- **Responsive**: Mobile-first design with Tailwind CSS

## 🧪 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Products
- `GET /api/v1/products/` - List products with filtering
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products/` - Create new product (auth required)
- `PUT /api/v1/products/:id` - Update product (auth required)
- `DELETE /api/v1/products/:id` - Delete product (auth required)

### Categories
- `GET /api/v1/categories/` - List all categories
- `GET /api/v1/categories/stats` - Category statistics

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Connect to Vercel
vercel --prod
```

### Backend (Railway)
```bash
# Connect to Railway
railway login
railway init
railway up
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Roadmap

- [x] User Authentication & Authorization
- [x] Product CRUD Operations
- [x] Category Management
- [x] Image Upload & Gallery
- [x] Search & Filtering
- [x] Responsive Design
- [x] Product Details Page
- [ ] Real-time Chat System
- [ ] Payment Integration
- [ ] Email Notifications
- [ ] Mobile App (React Native)
- [ ] Advanced Analytics
- [ ] Multi-language Support

## 🐛 Known Issues

- Categories may need manual refresh after backend restart
- Image uploads currently use placeholder URLs
- Real-time features pending WebSocket implementation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Akash Vinchankar**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Gin](https://gin-gonic.com/) for the lightweight Go web framework
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Unsplash](https://unsplash.com/) for the high-quality images

---

⭐ **Star this repo if you found it helpful!** ⭐

Built with ❤️ by [Akash Vinchankar](https://github.com/akashvinchankar)