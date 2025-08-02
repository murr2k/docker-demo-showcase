# Docker Features Demo Showcase

A comprehensive demonstration of Docker Hub, Docker Build Cloud, and Docker Scout features.

🚀 **Live Demo**: https://docker-demo-showcase.fly.dev/

## Features

- **Docker Hub Integration**: Repository management and image distribution
- **Docker Build Cloud**: Accelerated builds with multi-architecture support
- **Docker Scout**: Real-time vulnerability scanning and SBOM generation

## Tech Stack

- Frontend: React/Next.js 14
- Styling: Tailwind CSS
- Backend: Next.js API Routes
- Deployment: Fly.io
- CI/CD: GitHub Actions
- Container Registry: Docker Hub

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                │
│  ┌─────────────┬──────────────┬─────────────────┐  │
│  │  Docker Hub │ Build Cloud  │  Docker Scout   │  │
│  │   Feature   │   Feature    │    Feature      │  │
│  └──────┬──────┴──────┬───────┴────────┬────────┘  │
│         │             │                │           │
│  ┌──────▼─────────────▼────────────────▼────────┐  │
│  │            API Routes (Next.js)              │  │
│  │  - /api/dockerhub/*                          │  │
│  │  - /api/buildcloud/*                         │  │
│  │  - /api/scout/*                              │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │   External APIs      │
              │  - Docker Hub API    │
              │  - Docker CLI        │
              │  - Docker Scout CLI  │
              └──────────────────────┘
```

## Pages Structure

- `/` - Home page with overview
- `/docker-hub` - Docker Hub features demo
- `/build-cloud` - Build Cloud acceleration demo
- `/scout` - Scout vulnerability scanning demo
- `/api/*` - Backend API routes

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

### Docker Commands

```bash
# Build Docker image
npm run docker:build

# Run Docker Scout vulnerability scan
npm run docker:scout

# Build and push to Docker Hub
docker build -t murr2k/docker-demo-showcase .
docker push murr2k/docker-demo-showcase
```

### Deployment

The app automatically deploys to Fly.io when pushing to the main branch via GitHub Actions.

Manual deployment:
```bash
fly deploy --image murr2k/docker-demo-showcase:latest
```

## CI/CD Pipeline

- **GitHub Actions**: Automated testing, building, and deployment
- **Docker Hub**: Container registry for built images
- **Fly.io**: Production hosting platform
- **Docker Scout**: Automated vulnerability scanning in CI

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed deployment instructions and secret configuration

## Author

**murr2k** - [GitHub](https://github.com/murr2k) | [Docker Hub](https://hub.docker.com/u/murr2k)