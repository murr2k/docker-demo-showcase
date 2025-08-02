# Deployment Guide

## GitHub Secrets Setup

To enable the CI/CD pipeline, you need to configure the following secrets in your GitHub repository:

### Required Secrets

1. **DOCKER_USERNAME** - Your Docker Hub username (e.g., `murr2k`)
2. **DOCKER_HUB_TOKEN** - Your Docker Hub Personal Access Token (PAT)
3. **FLY_API_TOKEN** - Your Fly.io API token

### How to Add Secrets

1. Go to your repository: https://github.com/murr2k/docker-demo-showcase
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each secret

### Getting the Tokens

#### Docker Hub Personal Access Token
1. Log in to [Docker Hub](https://hub.docker.com)
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Give it a descriptive name (e.g., "GitHub Actions")
5. Select appropriate permissions (at least "Read & Write")
6. Copy the token and save it as `DOCKER_HUB_TOKEN` in GitHub

#### Fly.io API Token
1. Install Fly CLI if not already installed
2. Run: `fly auth token`
3. Copy the token and save it as `FLY_API_TOKEN` in GitHub

## Manual Deployment

To deploy manually:

```bash
# Deploy to Fly.io
fly deploy

# Check deployment status
fly status

# View logs
fly logs
```

## Monitoring

- Fly.io Dashboard: https://fly.io/apps/docker-demo-showcase/monitoring
- Application URL: https://docker-demo-showcase.fly.dev/

## Troubleshooting

If the GitHub Actions workflow fails:

1. Check the Actions tab for error logs
2. Verify all secrets are properly set
3. Ensure Docker Hub token has correct permissions
4. Check Fly.io app status with `fly status`