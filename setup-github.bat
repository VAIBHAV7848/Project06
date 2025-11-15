@echo off
echo ========================================
echo   GitHub Repository Setup
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [INFO] Initializing git repository...
    call git init
    echo [OK] Git initialized
    echo.
)

echo [INFO] Adding all files to git...
call git add .

echo.
echo [INFO] Creating initial commit...
call git commit -m "Initial commit - KLE Tech Connect"

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository (make it PUBLIC for free Pages)
echo 3. Copy the repository URL
echo 4. Run these commands (replace URL with yours):
echo.
echo    git remote add origin YOUR_REPO_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo 5. Then run: deploy-github-pages.bat
echo.
pause

