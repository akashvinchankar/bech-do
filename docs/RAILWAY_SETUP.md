# Railway Free Tier Backend Deployment Guide

## ✅ Railway Free Tier Limits (Sufficient for Your Project!)
- **500 hours/month** execution time (enough for 24/7 uptime)
- **1GB RAM** 
- **1GB Storage**
- **Custom domain support**
- **Automatic HTTPS**

## 🚀 Deploy Your Go Backend to Railway (Free)

### Step 1: Sign Up & Connect GitHub
1. Go to [Railway.app](https://railway.app)
2. **Sign up with GitHub** (free)
3. **Connect your GitHub account**

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`akashvinchankar/bech-do`** repository
4. Railway will auto-detect it's a Go project

### Step 3: Configure Root Directory
1. In project settings, set **Root Directory**: `backend`
2. Railway will automatically detect `main.go` and build

### Step 4: Add Environment Variables
In Railway project settings, add these environment variables:

```bash
# Database (Use your existing Supabase connection)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require

# Supabase Configuration  
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key# Security
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters

# Server Configuration  
SERVER_PORT=8080
SERVER_HOST=0.0.0.0
PORT=8080

# CORS Configuration
FRONTEND_URL=https://bech-do.vercel.app

# Environment
ENV=production
```

### Step 5: Get Your Backend URL
After deployment, Railway will provide a URL like:
`https://your-service-name.railway.app`

### Step 6: Update Frontend Environment Variable
Update in Vercel project settings:
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
```

## 📋 Quick Deployment Checklist:
- [ ] Railway account created with GitHub
- [ ] Project created from bech-do repository  
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Backend deployed successfully
- [ ] Frontend API URL updated in Vercel
- [ ] CORS resolved and app working

## 🔧 Troubleshooting:
- **Build fails**: Check if `go.mod` is in backend directory
- **Database connection fails**: Verify DATABASE_URL format
- **CORS issues**: Ensure FRONTEND_URL matches your Vercel domain

## 💡 Alternative Free Options:
- **Render.com**: Also has free tier (750 hours/month)
- **Fly.io**: Free tier available with resource limits
- **Heroku**: Limited free options