@echo off
echo ========================================
echo   DEPLOYING NOW - Quick Deploy
echo ========================================
echo.

set REPO_NAME=Project06

echo [INFO] Building and deploying to GitHub Pages...
echo [INFO] Your app will be at: https://vaibhav7848.github.io/Project06/
echo.

REM Check for API key
if exist .env (
    echo [OK] Found .env file
) else (
    echo [WARNING] No .env file - AI features may not work
    echo [INFO] App will still deploy, but you'll need to add API key later
)

echo.
echo [STEP 1] Building for GitHub Pages...
call vite build --base=/%REPO_NAME%/

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    echo.
    echo Try: npm install
    pause
    exit /b 1
)

echo [OK] Build successful!
echo.

echo [STEP 2] Deploying to GitHub Pages...
call npx gh-pages -d dist

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Deployment failed!
    echo.
    echo Make sure you have:
    echo 1. Pushed code to GitHub at least once
    echo 2. Run: git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ DEPLOYMENT SUCCESSFUL!
echo ========================================
echo.
echo 🌐 Your app URL:
echo    https://vaibhav7848.github.io/Project06/
echo.
echo 📋 IMPORTANT - Enable GitHub Pages:
echo    1. Go to: https://github.com/VAIBHAV7848/Project06/settings/pages
echo    2. Source: Select "gh-pages" branch
echo    3. Click "Save"
echo    4. Wait 1-2 minutes for site to go live
echo.
echo 💡 Share this link: https://vaibhav7848.github.io/Project06/
echo.
pause

