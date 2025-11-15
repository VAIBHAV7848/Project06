# Deployment Checklist

Use this checklist to ensure your application is ready for deployment.

## Pre-Deployment

- [ ] Environment variables configured (`.env` file created)
- [ ] `GEMINI_API_KEY` is set and valid
- [ ] All dependencies installed (`npm install`)
- [ ] Application builds successfully (`npm run build`)
- [ ] Production build tested locally (`npm run preview`)
- [ ] No console errors or warnings
- [ ] All features tested and working

## Security

- [ ] `.env` file is in `.gitignore` (already configured)
- [ ] No API keys or secrets in code
- [ ] Environment variables set in deployment platform
- [ ] HTTPS enabled (for production)
- [ ] Security headers configured (Nginx/Vercel/Netlify)

## Docker Deployment

- [ ] Docker installed and running
- [ ] `.env` file exists with `GEMINI_API_KEY`
- [ ] Docker image builds successfully
- [ ] Container runs without errors
- [ ] Health check endpoint responds (`/health`)
- [ ] Application accessible on configured port

## Cloud Platform Deployment

### Vercel
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] `vercel.json` configuration correct
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (if needed)

### Netlify
- [ ] Netlify CLI installed (`npm i -g netlify-cli`)
- [ ] `netlify.toml` configuration correct
- [ ] Environment variables set in Netlify dashboard
- [ ] Build settings configured

### AWS
- [ ] AWS CLI configured
- [ ] S3 bucket created
- [ ] CloudFront distribution configured
- [ ] Environment variables in build pipeline

### Google Cloud
- [ ] GCP CLI installed and authenticated
- [ ] Project created
- [ ] Cloud Run service configured
- [ ] Environment variables set

## Post-Deployment

- [ ] Application loads correctly
- [ ] All routes work (SPA routing)
- [ ] API calls successful
- [ ] No 404 errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Analytics/monitoring set up (optional)

## Monitoring

- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring set up (optional)
- [ ] Performance monitoring enabled (optional)
- [ ] Logs accessible

## Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] Deployment process documented

---

**Note:** This checklist is a guide. Adjust based on your specific deployment requirements.

