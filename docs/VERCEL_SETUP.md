# Vercel Configuration Guide

## Project Settings Configuration

Since this is a monorepo with the frontend in a subfolder, configure these settings in your Vercel project dashboard:

### 1. Framework Preset
- **Framework**: Next.js

### 2. Root Directory
- **Root Directory**: `frontend`

### 3. Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Development Command**: `npm run dev` (default)

### 4. Environment Variables
Add these in Vercel Project Settings → Environment Variables:

```bash
# Backend API URL (update when backend is deployed)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# Authentication
NEXTAUTH_URL=https://bech-do.vercel.app
NEXTAUTH_SECRET=your-32-char-secure-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Deployment Steps
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your `bech-do` project
3. Go to Settings → General
4. Set **Root Directory** to `frontend`
5. Go to Settings → Environment Variables
6. Add all the environment variables above
7. Redeploy the project

### Alternative: Manual Deployment
If automatic deployment doesn't work:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd /path/to/bech-do
vercel --prod
```

When prompted:
- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: Yes (select bech-do)
- **In which directory is your code located**: `./frontend`