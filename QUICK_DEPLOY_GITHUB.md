# 🚀 Quick Deploy to GitHub Pages

Your repository: **https://github.com/VAIBHAV7848/Project06.git**

## ⚡ One-Command Deploy

Just run:
```bash
setup-and-deploy.bat
```

This script will:
1. ✅ Initialize git (if needed)
2. ✅ Connect to your GitHub repo
3. ✅ Push all code to GitHub
4. ✅ Build for GitHub Pages
5. ✅ Deploy to gh-pages branch

## 📋 Manual Steps (if script doesn't work)

### 1. Add and Commit
```bash
git add .
git commit -m "Deploy to GitHub Pages"
```

### 2. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### 3. Build and Deploy
```bash
# Make sure you have .env file with GEMINI_API_KEY
npm run deploy:gh-pages
```

Or manually:
```bash
vite build --base=/Project06/
npx gh-pages -d dist
```

### 4. Enable GitHub Pages
1. Go to: https://github.com/VAIBHAV7848/Project06/settings/pages
2. **Source**: Select `gh-pages` branch
3. Click **Save**

## 🌐 Your Live Site

After deployment, your app will be at:
**https://vaibhav7848.github.io/Project06/**

## 🔑 API Key Setup

### Option 1: Build with .env file
Create `.env` file:
```
GEMINI_API_KEY=your_actual_api_key_here
```

Then build:
```bash
npm run deploy:gh-pages
```

### Option 2: Use GitHub Secrets (Recommended)
1. Go to: https://github.com/VAIBHAV7848/Project06/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `GEMINI_API_KEY`
4. Value: Your API key
5. The GitHub Actions workflow will use it automatically

## 🔄 Update Deployment

After making changes:
```bash
git add .
git commit -m "Update app"
git push
npm run deploy:gh-pages
```

## ✅ Checklist

- [ ] Run `setup-and-deploy.bat`
- [ ] Enable GitHub Pages in settings
- [ ] Set GEMINI_API_KEY (in .env or GitHub Secrets)
- [ ] Wait 1-2 minutes
- [ ] Visit: https://vaibhav7848.github.io/Project06/

---

**Need help?** Check [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed guide.

