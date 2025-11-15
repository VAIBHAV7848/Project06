# 🚀 GitHub Pages - Quick Temporary Deployment

Deploy your app to GitHub Pages for FREE temporary hosting!

## ⚡ Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (green button)
3. Repository name: `kle-tech-connect` (or any name you want)
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

**Option A: Using GitHub Desktop (Easiest)**
1. Download [GitHub Desktop](https://desktop.github.com)
2. File → Add Local Repository → Select `D:\Project`
3. Commit all files
4. Publish to GitHub

**Option B: Using Command Line**

Open PowerShell in your project folder and run:

```powershell
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for GitHub Pages"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to GitHub Pages

**Easy Way - Run the script:**
```bash
deploy-github-pages.bat
```

**Manual Way:**
```bash
# Replace REPO_NAME with your actual repository name
npm run build:gh-pages -- --base=/REPO_NAME/
npx gh-pages -d dist
```

Or edit `package.json` and replace `REPO_NAME` with your actual repo name, then:
```bash
npm run deploy:gh-pages
```

### Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select: **gh-pages** branch
5. Click **Save**
6. Wait 1-2 minutes...

### Step 5: Access Your Site! 🎉

Your app will be live at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

---

## 🔑 Setting Environment Variables

**Important:** GitHub Pages is static hosting, so environment variables need to be set at build time.

### Option 1: Build with API Key (Simple)
```bash
# Set API key in environment, then build
$env:GEMINI_API_KEY="your_key_here"
npm run build:gh-pages -- --base=/REPO_NAME/
npx gh-pages -d dist
```

### Option 2: Use GitHub Secrets (Recommended)

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `GEMINI_API_KEY`
4. Value: Your API key
5. Use GitHub Actions to build and deploy (see below)

---

## 🔄 Auto-Deploy on Push (Optional)

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build -- --base=/${{ github.event.repository.name }}/
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📝 Notes

- **Free**: GitHub Pages is 100% free
- **Temporary**: Perfect for testing and demos
- **Custom Domain**: You can add your own domain later
- **HTTPS**: Automatically included
- **Limits**: 
  - 1GB repository size
  - 100GB bandwidth/month
  - 10 builds/hour

---

## 🆘 Troubleshooting

**404 Error?**
- Make sure base path matches your repo name
- Check GitHub Pages is enabled in Settings
- Wait 2-3 minutes after enabling

**API Key Not Working?**
- API key must be set at build time
- Check browser console for errors
- Verify key is correct

**Build Fails?**
- Make sure `gh-pages` is installed: `npm install --save-dev gh-pages`
- Check Node.js version: `node --version` (should be 20+)

---

## ✅ Quick Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `gh-pages` package installed
- [ ] Built with correct base path
- [ ] Deployed to gh-pages branch
- [ ] GitHub Pages enabled in Settings
- [ ] Site is live!

---

**Need help?** Check the main [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.

