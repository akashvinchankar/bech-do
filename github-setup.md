# GitHub Setup Commands

After creating your repository on GitHub, run these commands:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bech-do.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Deployment Options

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set build command: `cd frontend && npm run build`
4. Set output directory: `frontend/.next`
5. Add environment variables from `frontend/.env.local`

### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Deploy from GitHub repository
3. Set start command: `cd backend && go run cmd/server/main.go`
4. Add environment variables from `backend/.env`
5. Railway will provide a URL for your API

### Environment Variables Setup
- Copy `.env.example` files to `.env` and `.env.local`
- Update URLs to match your deployed services
- Set production database credentials