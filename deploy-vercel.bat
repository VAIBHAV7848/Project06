@echo off
echo ========================================
echo   KLE Tech Connect - Vercel Deployment
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Vercel CLI not found. Installing...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo [INFO] Checking if logged in to Vercel...
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Not logged in. Opening browser for authentication...
    call vercel login
)

echo.
echo [INFO] Starting deployment...
echo [INFO] Make sure GEMINI_API_KEY is set in Vercel dashboard after deployment!
echo.

call vercel --prod

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Deployment Successful!
    echo ========================================
    echo.
    echo Don't forget to set GEMINI_API_KEY in Vercel dashboard:
    echo 1. Go to your project on vercel.com
    echo 2. Settings -^> Environment Variables
    echo 3. Add GEMINI_API_KEY with your API key
    echo 4. Redeploy
    echo.
) else (
    echo.
    echo [ERROR] Deployment failed. Check the error messages above.
    echo.
)

pause

