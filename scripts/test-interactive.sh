#!/bin/bash

# Script to test interactive features during development
echo "🎭 Running Playwright tests for interactive features..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${YELLOW}Dev server not running. Starting it in the background...${NC}"
    npm run dev &
    DEV_PID=$!
    echo "Waiting for dev server to start..."
    sleep 5
fi

# Run specific tests based on argument
if [ "$1" = "background" ]; then
    echo -e "${GREEN}Testing interactive background...${NC}"
    npm run test:e2e -- --project=chromium tests/e2e/interactive-background.spec.ts
elif [ "$1" = "features" ]; then
    echo -e "${GREEN}Testing Docker features...${NC}"
    npm run test:e2e -- --project=chromium tests/e2e/docker-features.spec.ts
elif [ "$1" = "perf" ]; then
    echo -e "${GREEN}Testing accessibility and performance...${NC}"
    npm run test:e2e -- --project=chromium tests/e2e/accessibility-performance.spec.ts
elif [ "$1" = "headed" ]; then
    echo -e "${GREEN}Running all tests in headed mode (visual)...${NC}"
    npm run test:e2e:headed
elif [ "$1" = "debug" ]; then
    echo -e "${GREEN}Running tests in debug mode...${NC}"
    npm run test:e2e:debug
else
    echo -e "${GREEN}Running all tests...${NC}"
    npm run test:e2e
fi

# Kill dev server if we started it
if [ ! -z "$DEV_PID" ]; then
    echo -e "${YELLOW}Stopping dev server...${NC}"
    kill $DEV_PID 2>/dev/null
fi

echo -e "${GREEN}✅ Test run complete!${NC}"
echo "View detailed report with: npm run test:e2e:report"