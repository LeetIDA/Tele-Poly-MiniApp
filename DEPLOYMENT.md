# Deployment Guide - Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Project

1. Create a `vercel.json` file in your project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

2. Ensure your `package.json` has the build script:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Website

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? (enter your project name)
# - Directory? ./
# - Build settings detected? Y

# Deploy to production
vercel --prod
```

## Step 4: Configure Telegram Mini App

1. Go to @BotFather on Telegram
2. Send `/mybots`
3. Select your bot
4. Choose "Bot Settings" → "Menu Button" → "Configure Menu Button"
5. Send your Vercel URL: `https://your-project.vercel.app`
6. Set button text (e.g., "Student Database")

## Step 5: Set Web App URL

With @BotFather:
```
/setmenubutton
[Select your bot]
[Send your Vercel URL]
```

OR use the API:
```bash
curl -X POST "https://api.telegram.org/bot8568033461:AAGRyJccAC9sRupYGqsBVTulzVuWNIqeBCY/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "Student Database",
      "web_app": {
        "url": "https://your-project.vercel.app"
      }
    }
  }'
```

## Environment Variables (REQUIRED)

Your app now uses environment variables for security. You MUST configure these in Vercel:

1. In Vercel dashboard → Project Settings → Environment Variables
2. Add all variables from `.env`:
   - `VITE_DB_URL` = libsql://polytechnic-2025-leetida.aws-us-east-2.turso.io
   - `VITE_DB_TOKEN` = eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9... (full token)
   - `VITE_BOT_TOKEN` = 8568033461:AAGRyJccAC9sRupYGqsBVTulzVuWNIqeBCY
   - `VITE_ADMIN_ID` = 5172525134
   - `VITE_USER_ID_2` = 6748897717
   - `VITE_USER_ID_3` = 5842265790

3. Apply to all environments (Production, Preview, Development)

**Important:** Without these environment variables, your app will not work!

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- You can view deployment logs in Vercel dashboard

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed by Vercel
4. Update Telegram Bot with new domain

## Testing

1. Open Telegram
2. Find your bot
3. Click the menu button (bottom left)
4. Your Mini App should open
5. Test search functionality

## Troubleshooting

### Build fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

### Mini App doesn't open
- Verify URL is HTTPS
- Check Telegram Bot settings
- Ensure Web App is properly configured

### White screen
- Check browser console for errors
- Verify Telegram WebApp SDK is loading
- Check if running inside Telegram context

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Redeploy latest
vercel --prod

# Remove deployment
vercel rm [deployment-url]
```

## Quick Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash
echo "Building project..."
npm run build

echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"
```

Make executable: `chmod +x deploy.sh`
Run: `./deploy.sh`

---

**Your Bot Token:** `8568033461:AAGRyJccAC9sRupYGqsBVTulzVuWNIqeBCY`

**Authorized Users:**
- 5172525134 (Admin)
- 6748897717
- 5842265790
