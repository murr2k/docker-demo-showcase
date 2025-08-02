# Project-Specific Instructions for Claude

This file contains lessons learned and specific instructions for working with the Docker Demo Showcase project.

## Project Overview

This is a Next.js application demonstrating Docker Hub, Build Cloud, and Scout features, deployed on Fly.io with automated CI/CD via GitHub Actions.

## Key Lessons Learned

### 1. Fly.io Token Management
- **Issue**: Multi-line tokens displayed in terminal often include newlines or commas
- **Solution**: Always copy Fly.io tokens as ONE continuous string without breaks
- **Format**: `FlyV1 fm2_[long_string_no_breaks]`
- **Best Practice**: Use org-wide tokens for CI/CD instead of deploy tokens

### 2. Docker Hub Authentication in CI/CD
- **PAT vs Password**: Both work, but PAT is more secure and recommended
- **Secret Name**: Use `DOCKER_HUB_TOKEN` even if using password
- **Format**: Just the token/password, no special formatting needed

### 3. Deployment Strategy
- **Preferred**: Build image → Push to Docker Hub → Fly.io pulls from Docker Hub
- **Why**: Avoids app ownership conflicts between local and CI environments
- **Implementation**: Use `flyctl deploy --image` instead of building on Fly.io

### 4. Next.js Standalone Builds
- **Requirement**: Set `output: 'standalone'` in `next.config.js` for Docker deployments
- **Dockerfile**: Use multi-stage builds to minimize image size
- **Public Folder**: May need to create `public/.gitkeep` if folder doesn't exist

## CI/CD Workflow

The project uses a three-stage deployment:
1. **Test**: Run linting and tests
2. **Scout-scan**: Build Docker image, push to Docker Hub, scan for vulnerabilities
3. **Deploy**: Pull image from Docker Hub and deploy to Fly.io

## Common Commands

```bash
# Local development
npm run dev

# Build and push Docker image
npm run docker:build
docker push murr2k/docker-demo-showcase:latest

# Deploy to Fly.io
fly deploy --image murr2k/docker-demo-showcase:latest

# Check deployment status
fly status
fly logs
```

## Debugging Tips

1. **GitHub Actions Secrets**: Check for extra whitespace or newlines
2. **Fly.io Apps**: Use `fly apps list` to verify app visibility
3. **Docker Hub**: Ensure repository exists before pushing
4. **Token Issues**: Use debug output to check token length and format

## Environment Variables

Required for deployment:
- `DOCKER_USERNAME`: Docker Hub username (default: murr2k)
- `DOCKER_HUB_TOKEN`: Docker Hub password or PAT
- `FLY_API_TOKEN`: Fly.io organization token (with FlyV1 prefix)

## Architecture Decisions

1. **Mock Data**: Used for demos to avoid API rate limits and keys
2. **API Routes**: Next.js API routes handle backend logic
3. **Docker Hub**: Central registry for consistent deployments
4. **Fly.io**: Chosen for Docker-native support and global edge network

## Future Improvements

- Add real Docker API integration with proper authentication
- Implement caching for API responses
- Add more interactive demos
- Create dashboard for monitoring deployments