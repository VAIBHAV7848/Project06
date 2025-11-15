#!/bin/bash

echo "========================================"
echo "  KLE Tech Connect - Vercel Deployment"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "[INFO] Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install Vercel CLI"
        exit 1
    fi
fi

# Check if logged in
echo "[INFO] Checking if logged in to Vercel..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "[INFO] Not logged in. Opening browser for authentication..."
    vercel login
fi

echo ""
echo "[INFO] Starting deployment..."
echo "[INFO] Make sure GEMINI_API_KEY is set in Vercel dashboard after deployment!"
echo ""

vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  Deployment Successful!"
    echo "========================================"
    echo ""
    echo "Don't forget to set GEMINI_API_KEY in Vercel dashboard:"
    echo "1. Go to your project on vercel.com"
    echo "2. Settings -> Environment Variables"
    echo "3. Add GEMINI_API_KEY with your API key"
    echo "4. Redeploy"
    echo ""
else
    echo ""
    echo "[ERROR] Deployment failed. Check the error messages above."
    echo ""
fi

