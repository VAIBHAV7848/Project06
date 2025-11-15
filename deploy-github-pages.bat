@echo off
echo ========================================
echo   GitHub Pages Deployment Setup
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [INFO] Initializing git repository...
    call git init
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to initialize git
        pause
        exit /b 1
    )
)

echo.
echo [STEP 1] Enter your GitHub repository name:
echo Example: kle-tech-connect (without .git)
set /p REPO_NAME="Repository name: "

if "%REPO_NAME%"=="" (
    echo [ERROR] Repository name cannot be empty
    pause
    exit /b 1
)

echo.
echo [STEP 2] Building for GitHub Pages...
echo [INFO] Base path will be: /%REPO_NAME%/

REM Update vite config temporarily or build with base
call vite build --base=/%REPO_NAME%/

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo.
echo [STEP 3] Deploying to GitHub Pages...
call npx gh-pages -d dist

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Deployment Successful!
    echo ========================================
    echo.
    echo Your app will be available at:
    echo https://YOUR_USERNAME.github.io/%REPO_NAME%/
    echo.
    echo [IMPORTANT] Next steps:
    echo 1. Go to your GitHub repository
    echo 2. Settings -^> Pages
    echo 3. Source: gh-pages branch
    echo 4. Save
    echo.
    echo [NOTE] It may take 1-2 minutes for the site to be live
    echo.
) else (
    echo.
    echo [ERROR] Deployment failed
    echo.
    echo Make sure you have:
    echo 1. Created a GitHub repository
    echo 2. Added remote: git remote add origin https://github.com/USERNAME/%REPO_NAME%.git
    echo 3. Pushed code at least once
    echo.
)

pause

