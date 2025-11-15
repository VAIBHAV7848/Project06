# 🚀 Quick Free Deployment Guide

Deploy your app to **Vercel** (100% FREE) in 5 minutes!

## Option 1: Deploy via Vercel Website (Easiest - No CLI needed!)

### Step 1: Push to GitHub
1. Create a new repository on GitHub (if you haven't already)
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub to sign in - it's free!)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your_actual_api_key_here`
7. Click **"Deploy"**
8. Wait 2-3 minutes... 🎉 **Your app is live!**

You'll get a URL like: `https://your-app-name.vercel.app`

---

## Option 2: Deploy via Vercel CLI (Command Line)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
(Opens browser to authenticate)

### Step 3: Deploy
```bash
# Make sure you're in the project directory
cd D:\Project

# Deploy (follow prompts)
vercel

# When asked about environment variables, add:
# GEMINI_API_KEY = your_actual_api_key_here
```

### Step 4: Set Environment Variable (if not set during deploy)
```bash
vercel env add GEMINI_API_KEY
# Paste your API key when prompted
```

### Step 5: Redeploy with environment variable
```bash
vercel --prod
```

---

## Option 3: Deploy to Netlify (Also FREE!)

### Via Netlify Website:
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Show advanced"** → **"New variable"**:
   - Key: `GEMINI_API_KEY`
   - Value: `your_actual_api_key_here`
7. Click **"Deploy site"**

---

## Option 4: Deploy to GitHub Pages (FREE!)

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Add deploy script to package.json
The script is already there! Just run:
```bash
npm run deploy
```

### Step 3: Configure GitHub Pages
1. Go to your GitHub repo → Settings → Pages
2. Source: `gh-pages` branch
3. Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO`

**Note**: For GitHub Pages, you'll need to set the API key differently since it's a static site. Consider using a serverless function or proxy.

---

## 🔑 Getting Your Gemini API Key

If you don't have one yet:
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (you'll only see it once!)

---

## ✅ After Deployment

1. **Test your app**: Visit the deployment URL
2. **Check AI features**: Try the AI tutor feature
3. **Custom domain** (optional): Add your own domain in Vercel/Netlify settings

---

## 🆘 Troubleshooting

**Build fails?**
- Make sure `GEMINI_API_KEY` is set in environment variables
- Check build logs in Vercel/Netlify dashboard

**API not working?**
- Verify your API key is correct
- Check browser console for errors
- Ensure environment variable is set for production builds

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Easiest setup
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Perfect for React/Vite apps
- ✅ 100% free for personal projects

**Start here**: https://vercel.com/new

