@echo off
echo ========================================
echo   Complete GitHub Setup and Deploy
echo ========================================
echo.

set REPO_NAME=Project06
set REPO_URL=https://github.com/VAIBHAV7848/Project06.git
set USERNAME=VAIBHAV7848

echo [INFO] Repository: %REPO_NAME%
echo [INFO] URL: %REPO_URL%
echo.

REM Step 1: Initialize git if needed
if not exist .git (
    echo [STEP 1] Initializing git repository...
    call git init
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to initialize git
        pause
        exit /b 1
    )
    echo [OK] Git initialized
) else (
    echo [OK] Git repository already exists
)

echo.

REM Step 2: Check if remote exists
call git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [STEP 2] Adding GitHub remote...
    call git remote add origin %REPO_URL%
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to add remote
        pause
        exit /b 1
    )
    echo [OK] Remote added
) else (
    echo [OK] Remote already configured
    call git remote set-url origin %REPO_URL%
    echo [OK] Remote URL updated
)

echo.

REM Step 3: Add all files
echo [STEP 3] Staging all files...
call git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to stage files
    pause
    exit /b 1
)
echo [OK] Files staged

echo.

REM Step 4: Commit
echo [STEP 4] Creating commit...
call git commit -m "Deploy to GitHub Pages - KLE Tech Connect" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] No changes to commit or commit failed
) else (
    echo [OK] Committed
)

echo.

REM Step 5: Set branch to main
echo [STEP 5] Setting branch to main...
call git branch -M main 2>nul
echo [OK] Branch set to main

echo.

REM Step 6: Push to GitHub
echo [STEP 6] Pushing to GitHub...
echo [INFO] This may ask for your GitHub credentials...
call git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] Push failed. You may need to:
    echo 1. Authenticate with GitHub
    echo 2. Or use: git push -u origin main --force
    echo.
    echo Continue with deployment anyway? (Y/N)
    set /p CONTINUE="> "
    if /i not "%CONTINUE%"=="Y" (
        echo Deployment cancelled
        pause
        exit /b 1
    )
) else (
    echo [OK] Pushed to GitHub
)

echo.

REM Step 7: Build for GitHub Pages
echo [STEP 7] Building for GitHub Pages...
echo [INFO] Base path: /%REPO_NAME%/
echo [INFO] Make sure GEMINI_API_KEY is set in your environment or .env file
echo.

REM Check for .env file
if exist .env (
    echo [INFO] Found .env file, loading environment...
    for /f "tokens=1,2 delims==" %%a in (.env) do (
        if "%%a"=="GEMINI_API_KEY" set GEMINI_API_KEY=%%b
    )
    if defined GEMINI_API_KEY (
        set "GEMINI_API_KEY=%GEMINI_API_KEY%"
        echo [OK] API key loaded from .env
    )
)

call vite build --base=/%REPO_NAME%/
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    echo [INFO] Make sure you have set GEMINI_API_KEY
    pause
    exit /b 1
)
echo [OK] Build successful

echo.

REM Step 8: Deploy to GitHub Pages
echo [STEP 8] Deploying to GitHub Pages...
call npx gh-pages -d dist
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Deployment failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Deployment Complete!
echo ========================================
echo.
echo Your app is being deployed to:
echo https://%USERNAME%.github.io/%REPO_NAME%/
echo.
echo [IMPORTANT] Final Step:
echo 1. Go to: https://github.com/%USERNAME%/%REPO_NAME%/settings/pages
echo 2. Under "Source", select: gh-pages branch
echo 3. Click "Save"
echo 4. Wait 1-2 minutes for the site to go live
echo.
echo [NOTE] If API key is not working:
echo - Set GEMINI_API_KEY as GitHub Secret in repository settings
echo - Or rebuild with: vite build --base=/Project06/ (with API key in .env)
echo.
pause

