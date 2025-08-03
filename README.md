# Docker Demo Showcase v2.0

A comprehensive, interactive demonstration of the Docker ecosystem featuring stunning visualizations, real-time metrics, and immersive experiences. Built with Next.js and deployed on Fly.io.

🚀 **Live Demo**: https://docker.linknode.com

🎉 **v2.0.0 Now Live!** Experience the complete Docker ecosystem with interactive demos, animations, and audio narration.

## Features

### Core Docker Services (v1.0)
- **Docker Hub Integration**: Repository management and image distribution
- **Docker Build Cloud**: Accelerated builds with multi-architecture support
- **Docker Scout**: Real-time vulnerability scanning and SBOM generation

### New in v2.0 🆕
- **🎼 Docker Compose**: Interactive YAML playground with service visualization
- **🐝 Docker Swarm**: Cluster management with real-time node monitoring
- **💻 Docker Desktop**: Simulated desktop experience showcase
- **🧩 Extensions**: Marketplace demo with installation simulation
- **📦 Registry**: Private registry management interface
- **📊 Metrics Dashboard**: Real-time Grafana-style visualizations

### Experience Enhancements
- **🎨 Modern UI/UX**: Glassmorphism, particle effects, smooth animations
- **🎵 Audio System**: Background music and voice narration
- **✨ Interactive**: Hover effects, real-time updates, dynamic content
- **🌙 Dark Theme**: Optimized for developer experience

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