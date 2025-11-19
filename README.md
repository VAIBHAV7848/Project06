<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# KLE Tech Connect

A modern university student platform with AI-powered tutoring, study rooms, events, and more.

## Features

- 🤖 AI-Powered Tutoring with Gemini
- 📚 Study Notes & PYQs
- 🏛️ Campus Map
- 🎓 Study Rooms
- 📅 Events Hub
- 💬 Doubt System
- 💝 Donation Bridge

## Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is deployment-ready with multiple deployment options:

### 🐳 Docker Deployment (Recommended)

**Using Docker Compose:**
```bash
docker-compose up -d
```

**Using Docker commands:**
```bash
npm run docker:build
npm run docker:run
```

Access the app at `http://localhost:8080`

### ☁️ Cloud Platforms

- **Vercel**: `vercel`
- **Netlify**: Configure build command `npm run build` and publish directory `dist`
- **AWS S3 + CloudFront**: Upload `dist` folder to S3
- **Google Cloud Run**: Use the provided Dockerfile
- **Azure Static Web Apps**: `swa deploy ./dist`

### 📖 Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions for all platforms.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run preview` - Preview production build locally
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:build:run` - Build and run Docker container

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

Get your API key from: https://aistudio.google.com/apikey

## Project Structure

```
.
├── components/          # React components
├── services/           # API services
├── constants.ts        # App constants
├── types.ts           # TypeScript types
├── vite.config.ts     # Vite configuration
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── nginx.conf         # Nginx configuration for production
```

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS
- **Deployment**: Docker, Nginx

## Security

- Environment variables are never committed to version control
- Production builds are optimized and minified
- Security headers configured in Nginx
- Health check endpoint available at `/health`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue in the repository.
