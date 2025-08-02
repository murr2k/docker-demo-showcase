# Docker Demo Showcase Template

This repository serves as a template for creating Docker demonstration websites with integrated CI/CD pipelines.

## 🚀 Using This Template

### 1. Create Your Repository
Click the "Use this template" button on GitHub to create your own copy of this project.

### 2. Required Customizations

#### Update Project Name
Replace `docker-demo-showcase` with your project name in:
- `package.json` - name field
- `fly.toml` - app name
- `.github/workflows/deploy.yml` - app name references
- `README.md` - project title and descriptions

#### Update Docker Hub References
Replace `murr2k` with your Docker Hub username in:
- `package.json` - docker:* scripts
- `.github/workflows/deploy.yml` - image references
- `fly.toml` - image reference
- `src/app/api/*/route.ts` - mock data references

#### Update GitHub References
Replace repository URLs in:
- `README.md` - all GitHub links
- `package.json` - repository field

### 3. Configure Secrets

Add these secrets to your GitHub repository:
- `DOCKER_HUB_TOKEN` - Your Docker Hub password or PAT
- `FLY_API_TOKEN` - Your Fly.io organization token

### 4. Set Up Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Create your app (use your own app name)
fly apps create your-app-name

# Update fly.toml with your app name
```

### 5. Customize Features

The template includes three main feature demos:
- **Docker Hub Integration** - Modify `/src/app/docker-hub/*`
- **Build Cloud Demo** - Modify `/src/app/build-cloud/*`
- **Scout Security** - Modify `/src/app/scout/*`

### 6. Update Content

1. Replace logo and branding in `/src/app/page.tsx`
2. Update feature descriptions for your use case
3. Modify color scheme in `/src/app/globals.css`
4. Update meta tags in `/src/app/layout.tsx`

## 📁 Template Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   └── lib/             # Utility functions
├── .github/
│   └── workflows/       # CI/CD pipelines
├── public/              # Static assets
├── Dockerfile           # Multi-stage Docker build
├── fly.toml            # Fly.io configuration
└── setup.sh            # Quick setup script
```

## 🛠️ Quick Setup Script

Run the setup script to automatically customize the template:

```bash
chmod +x setup.sh
./setup.sh
```

This will prompt you for:
- Your project name
- Docker Hub username
- GitHub username
- Fly.io app name

## 📚 Documentation

- [Original README](README.md) - Full project documentation
- [CLAUDE.md](CLAUDE.md) - Lessons learned and tips
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🎯 Template Features

- ✅ Next.js 14 with TypeScript
- ✅ Tailwind CSS styling
- ✅ Docker multi-stage builds
- ✅ GitHub Actions CI/CD
- ✅ Fly.io deployment ready
- ✅ Mock API demonstrations
- ✅ Responsive design
- ✅ Documentation templates

## 🚦 Getting Started

1. Use this template
2. Clone your new repository
3. Run `npm install`
4. Run `./setup.sh` for guided setup
5. Configure GitHub secrets
6. Push changes to trigger deployment

## 💡 Tips

- Keep mock data for demos to avoid API rate limits
- Test locally with `npm run dev` before deploying
- Use `fly logs` to debug deployment issues
- Check GitHub Actions logs for CI/CD problems

## 📄 License

This template is MIT licensed. See [LICENSE](LICENSE) for details.