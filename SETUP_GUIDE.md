# Complete Setup Guide - Bech-Do Marketplace

## Quick Start with Supabase

### Step 1: Create Supabase Project

1. Visit [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `bech-do-marketplace`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to you
5. Click "Create new project" (takes ~2 minutes)

### Step 2: Get Your Supabase Credentials

Once your project is created:

1. **Go to Settings → Database**

   - Copy the connection string under "Connection string" → "URI"
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

2. **Go to Settings → API**
   - Copy **URL**: `https://[PROJECT-REF].supabase.co`
   - Copy **anon public key**: `eyJ0eXAiOiJKV...`
   - Copy **service_role secret**: `eyJ0eXAiOiJKV...`

### Step 3: Set Up Database Schema

1. **Go to SQL Editor in Supabase Dashboard**
2. Click "New Query"
3. **Copy and paste the entire content** from `backend/migrations/001_initial_schema.sql`
4. Click "Run" to execute the schema creation

### Step 4: Update Backend Environment

Update `backend/.env` with your Supabase details:

```env
# Database Configuration (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require

# Supabase Configuration
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=eyJ0eXAiOiJKV...
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV...

# JWT Secret (change this to a random string)
JWT_SECRET=your-super-secret-random-jwt-key-here

# Server Configuration
SERVER_PORT=8080
SERVER_HOST=localhost

# Cloudinary Configuration (optional for now)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Environment
ENV=development
```

### Step 5: Update Frontend Environment

Create `frontend/.env.local` with:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV...

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Cloudinary Configuration (optional for now)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Step 6: Test Backend Connection

1. **Open terminal in backend directory**:

   ```bash
   cd backend
   go run cmd/server/main.go
   ```

2. **Test health endpoint**:

   ```bash
   curl http://localhost:8080/health
   ```

   You should see:

   ```json
   {
     "status": "ok",
     "message": "Bech-Do API is running",
     "version": "1.0.0",
     "database": "connected",
     "stats": {
       "users": 0,
       "products": 0,
       "categories": 8
     }
   }
   ```

### Step 7: Test Frontend

1. **Open terminal in frontend directory**:

   ```bash
   cd frontend
   npm run dev
   ```

2. **Visit** `http://localhost:3000`

### Step 8: Test API Integration

1. **Register a new user** via the frontend or API:

   ```bash
   curl -X POST http://localhost:8080/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "first_name": "John",
       "last_name": "Doe"
     }'
   ```

2. **Check Supabase Dashboard** → Table Editor → `users` to see the new user

## Troubleshooting

### Common Issues:

**1. Database Connection Failed**

- ✅ Check DATABASE_URL format is correct
- ✅ Verify password doesn't have special characters needing URL encoding
- ✅ Ensure project is fully created in Supabase (wait 2-3 minutes)

**2. Schema Creation Failed**

- ✅ Make sure database is empty before running the migration
- ✅ Run the SQL in Supabase SQL Editor, not command line
- ✅ Check for syntax errors in the migration file

**3. CORS Errors**

- ✅ Verify FRONTEND_URL matches your Next.js dev server
- ✅ Check that CORS middleware is properly configured

**4. JWT Token Issues**

- ✅ Ensure JWT_SECRET is set and consistent
- ✅ Check token expiration settings

### Verify Setup Checklist:

- [ ] Supabase project created and fully initialized
- [ ] Database schema successfully applied (8 categories should exist)
- [ ] Backend `.env` file updated with correct Supabase credentials
- [ ] Frontend `.env.local` file created with API URL
- [ ] Backend starts without errors: `go run cmd/server/main.go`
- [ ] Frontend starts without errors: `npm run dev`
- [ ] Health endpoint returns "connected" status
- [ ] Can register new users through the API
- [ ] New users appear in Supabase dashboard

## Next Steps

Once everything is working:

1. **Set up Cloudinary** for image uploads
2. **Configure authentication** policies in Supabase
3. **Add sample product data** for testing
4. **Deploy to production** (Vercel + Railway + Supabase)

## Production Considerations

- Change all secrets and passwords for production
- Enable Row Level Security (RLS) in Supabase
- Set up proper CORS for production domains
- Configure connection pooling limits
- Set up monitoring and logging
