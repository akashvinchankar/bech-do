# Production Environment Variables for Vercel Deployment

## Required Variables
```bash
# Backend API URL - Update with your Railway/Render backend URL
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app

# Authentication
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate-secure-32-char-secret-key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://pqwnjvrmxjssfxuyrigz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd25qdnJteGpzc2Z4dXlyaWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzUxNjQsImV4cCI6MjA3MzQxMTE2NH0.p08DokOL-Grwiq0lkKP9dhcCMSm786SdkI_WWt9CdQE

# Optional: Image Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Setup Steps:
1. Deploy backend to Railway/Render
2. Update NEXT_PUBLIC_API_URL with actual backend URL
3. Generate secure NEXTAUTH_SECRET: `openssl rand -base64 32`
4. Update NEXTAUTH_URL with your Vercel domain
5. Add all variables to Vercel project settings

## Backend Environment Variables (Railway/Render):
```bash
DATABASE_URL=postgresql://postgres:password@host:5432/database
SUPABASE_URL=https://pqwnjvrmxjssfxuyrigz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd25qdnJteGpzc2Z4dXlyaWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzUxNjQsImV4cCI6MjA3MzQxMTE2NH0.p08DokOL-Grwiq0lkKP9dhcCMSm786SdkI_WWt9CdQE
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-super-secret-jwt-key
SERVER_PORT=8080
SERVER_HOST=0.0.0.0
FRONTEND_URL=https://your-app.vercel.app
ENV=production
```