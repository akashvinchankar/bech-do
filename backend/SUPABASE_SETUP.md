# Supabase Setup Guide for Bech-Do

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `bech-do-marketplace`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your location
6. Click "Create new project"
7. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Connection Details

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Copy the following information:

   - **Host**: `db.[your-project-ref].supabase.co`
   - **Database name**: `postgres`
   - **Username**: `postgres`
   - **Password**: [your database password]
   - **Port**: `5432`

3. Go to **Settings** → **API**
   - Copy **Project URL**
   - Copy **anon public key**
   - Copy **service_role secret key**

## Step 3: Update Environment Variables

Update your `.env` file with your Supabase credentials:

```env
# Database Configuration (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require

# Supabase Configuration
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# JWT Secret
JWT_SECRET=bech-do-super-secret-jwt-key-2024

# Server Configuration
SERVER_PORT=8080
SERVER_HOST=localhost

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=bech-do-cloud
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Environment
ENV=development
```

## Step 4: Run Database Migrations

You can either:

### Option A: Use Supabase SQL Editor

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the SQL from `migrations/001_initial_schema.sql`
3. Click "Run"

### Option B: Use the backend auto-migration

1. Update your `.env` file with the correct DATABASE_URL
2. Run the Go backend - it will auto-migrate the tables

## Step 5: Enable Row Level Security (Optional but Recommended)

1. Go to **Authentication** → **Settings**
2. Enable Row Level Security for better security
3. We'll set up policies later as needed

## Step 6: Set up Storage for Images (Optional)

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Set it to public if you want direct access to images
4. Update the backend to use Supabase storage instead of Cloudinary (optional)

## Next Steps

1. Test the database connection by running the Go backend
2. Create sample data through the API
3. Set up authentication policies
4. Deploy to production

## Troubleshooting

### Connection Issues

- Make sure your IP is allowed (Supabase allows all IPs by default)
- Check that the DATABASE_URL format is correct
- Verify your password doesn't contain special characters that need URL encoding

### SSL Issues

- Always use `sslmode=require` for Supabase connections
- Don't use `sslmode=disable` with Supabase

### Migration Issues

- Make sure the database is empty before running migrations
- Check the Go logs for detailed error messages
- Verify all required columns and constraints are included
