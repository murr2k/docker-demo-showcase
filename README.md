# Docker Features Demo Showcase

A comprehensive demonstration of Docker Hub, Docker Build Cloud, and Docker Scout features.

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

## Author

murr2k