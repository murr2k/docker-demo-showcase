#!/bin/bash

# Docker Demo Showcase Template Setup Script
# This script helps customize the template for your project

echo "🚀 Docker Demo Showcase Template Setup"
echo "====================================="
echo ""

# Prompt for project details
read -p "Enter your project name (e.g., my-docker-demo): " PROJECT_NAME
read -p "Enter your Docker Hub username: " DOCKER_USERNAME
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your Fly.io app name (must be unique): " FLY_APP_NAME

# Validate inputs
if [ -z "$PROJECT_NAME" ] || [ -z "$DOCKER_USERNAME" ] || [ -z "$GITHUB_USERNAME" ] || [ -z "$FLY_APP_NAME" ]; then
    echo "❌ Error: All fields are required!"
    exit 1
fi

echo ""
echo "📝 Updating project files..."

# Function to replace text in files
replace_in_file() {
    local file=$1
    local search=$2
    local replace=$3
    
    if [ -f "$file" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|$search|$replace|g" "$file"
        else
            # Linux
            sed -i "s|$search|$replace|g" "$file"
        fi
        echo "✓ Updated $file"
    else
        echo "⚠️  Warning: $file not found"
    fi
}

# Update package.json
replace_in_file "package.json" "docker-demo-showcase" "$PROJECT_NAME"
replace_in_file "package.json" "murr2k" "$DOCKER_USERNAME"
replace_in_file "package.json" "github.com/murr2k/docker-demo-showcase" "github.com/$GITHUB_USERNAME/$PROJECT_NAME"

# Update fly.toml
replace_in_file "fly.toml" "docker-demo-showcase" "$FLY_APP_NAME"
replace_in_file "fly.toml" "murr2k" "$DOCKER_USERNAME"

# Update GitHub Actions workflow
replace_in_file ".github/workflows/deploy.yml" "docker-demo-showcase" "$PROJECT_NAME"
replace_in_file ".github/workflows/deploy.yml" "murr2k" "$DOCKER_USERNAME"

# Update README.md
replace_in_file "README.md" "Docker Demo Showcase" "$PROJECT_NAME"
replace_in_file "README.md" "docker-demo-showcase" "$PROJECT_NAME"
replace_in_file "README.md" "murr2k" "$GITHUB_USERNAME"

# Update API routes with Docker Hub username
for file in src/app/api/*/route.ts; do
    replace_in_file "$file" "murr2k" "$DOCKER_USERNAME"
done

# Update Docker Compose if it exists
if [ -f "docker-compose.yml" ]; then
    replace_in_file "docker-compose.yml" "docker-demo-showcase" "$PROJECT_NAME"
    replace_in_file "docker-compose.yml" "murr2k" "$DOCKER_USERNAME"
fi

echo ""
echo "🎨 Optional: Update branding and colors"
echo "- Edit src/app/page.tsx for homepage content"
echo "- Modify src/app/globals.css for color scheme"
echo "- Update public/favicon.ico with your logo"

echo ""
echo "🔐 Next steps:"
echo "1. Create your Fly.io app:"
echo "   fly apps create $FLY_APP_NAME"
echo ""
echo "2. Add GitHub Secrets:"
echo "   - DOCKER_HUB_TOKEN (your Docker Hub password or PAT)"
echo "   - FLY_API_TOKEN (your Fly.io organization token)"
echo ""
echo "3. Commit and push changes:"
echo "   git add ."
echo "   git commit -m \"Customize template for $PROJECT_NAME\""
echo "   git push origin main"
echo ""
echo "✅ Setup complete! Your project is ready to deploy."
echo ""
echo "📚 For more information, see:"
echo "   - TEMPLATE.md for template documentation"
echo "   - README.md for project documentation"
echo "   - CLAUDE.md for deployment tips"