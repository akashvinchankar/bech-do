#!/bin/bash

# Bech-Do Setup Script
echo "🚀 Setting up Bech-Do Marketplace..."

# Check if required tools are installed
echo "📦 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Go
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup backend
echo "🔧 Setting up backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created backend/.env - Please update with your Supabase credentials"
fi

echo "📦 Installing Go dependencies..."
go mod download

echo "🔧 Setting up frontend..."
cd ../frontend

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "📝 Created frontend/.env.local - Please update with your configuration"
fi

echo "📦 Installing Node.js dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Update backend/.env with your Supabase credentials"
echo "2. Update frontend/.env.local with your configuration"
echo "3. Start backend: cd backend && go run cmd/server/main.go"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Your app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   API Docs: http://localhost:8080/api/v1"
echo ""
echo "📖 See README.md for detailed documentation"