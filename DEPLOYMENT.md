# Deployment Guide

This guide covers various deployment options for KLE Tech Connect.

## Prerequisites

- Node.js 20+ (for local builds)
- Docker and Docker Compose (for containerized deployment)
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/apikey)

## Environment Variables

Create a `.env` file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Using Docker Compose

1. Create `.env` file with your API key:
   ```bash
   echo "GEMINI_API_KEY=your_key_here" > .env
   ```

2. Build and run:
   ```bash
   docker-compose up -d
   ```

3. Access the application at `http://localhost:8080`

4. To stop:
   ```bash
   docker-compose down
   ```

#### Using Docker Commands

1. Build the image (with API key):
   ```bash
   docker build --build-arg GEMINI_API_KEY=$(cat .env | grep GEMINI_API_KEY | cut -d '=' -f2) -t kle-tech-connect .
   ```
   
   Or if you have the key in your environment:
   ```bash
   docker build --build-arg GEMINI_API_KEY=$GEMINI_API_KEY -t kle-tech-connect .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 kle-tech-connect
   ```
   
   Note: The API key is baked into the build, so you don't need to pass it at runtime.

### Option 2: Static Hosting (Vercel, Netlify, etc.)

#### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

#### Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

#### GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 3: Traditional Server Deployment

1. Build the application:
   ```bash
   npm install
   npm run build
   ```

2. The `dist` folder contains the production build

3. Serve using any static file server:
   - **Nginx**: Copy `dist` contents to `/usr/share/nginx/html` and use the provided `nginx.conf`
   - **Apache**: Copy `dist` contents to your web root
   - **Node.js**: Use `npm run preview` to test the production build locally

4. Set environment variables on your server (for build-time injection)

### Option 4: Cloud Platforms

#### AWS (S3 + CloudFront)

1. Build the application:
   ```bash
   npm run build
   ```

2. Upload `dist` contents to S3 bucket

3. Configure CloudFront distribution

4. Set environment variables in your CI/CD pipeline

#### Google Cloud Platform (Cloud Run)

1. Use the provided Dockerfile

2. Build and deploy:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/kle-tech-connect
   gcloud run deploy --image gcr.io/PROJECT_ID/kle-tech-connect --platform managed
   ```

3. Set environment variables in Cloud Run console

#### Azure (Static Web Apps)

1. Install Azure Static Web Apps CLI:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. Deploy:
   ```bash
   swa deploy ./dist
   ```

## Health Check

The application includes a health check endpoint at `/health` that returns `200 OK` when the service is running.

## Troubleshooting

### Build Issues

- Ensure Node.js version is 20 or higher
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### API Key Issues

- Verify your `.env` file exists and contains `GEMINI_API_KEY`
- For production builds, ensure environment variables are set in your deployment platform
- Check that the API key is valid and has proper permissions

### Docker Issues

- Ensure Docker is running
- Check container logs: `docker logs kle-tech-connect`
- Verify port 8080 is not in use: `netstat -an | grep 8080`

## Security Notes

- Never commit `.env` files
- Use environment variables in your deployment platform
- Consider using secrets management services (AWS Secrets Manager, Azure Key Vault, etc.)
- Enable HTTPS in production
- Review and adjust security headers in `nginx.conf` as needed

## Performance Optimization

The production build includes:
- Code splitting for React and Gemini AI libraries
- Minification and compression
- Optimized asset caching
- Gzip compression (via Nginx)

## Monitoring

Consider adding:
- Application performance monitoring (APM)
- Error tracking (Sentry, etc.)
- Analytics
- Uptime monitoring

