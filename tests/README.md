# Playwright E2E Testing

## Overview

This project uses Playwright for end-to-end testing to ensure the interactive particle background and all Docker features work correctly across different browsers.

## Test Structure

```
tests/
├── e2e/
│   ├── interactive-background.spec.ts  # Tests for particle animation
│   ├── docker-features.spec.ts        # Tests for Docker showcase features
│   └── accessibility-performance.spec.ts # A11y and performance tests
└── README.md
```

## Running Tests

### Quick Commands

```bash
# Run all tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# Generate code by recording actions
npm run test:e2e:codegen

# View HTML report after tests
npm run test:e2e:report
```

### Using the Test Script

```bash
# Test interactive background only
./scripts/test-interactive.sh background

# Test Docker features
./scripts/test-interactive.sh features

# Test performance
./scripts/test-interactive.sh perf

# Run all tests in headed mode
./scripts/test-interactive.sh headed

# Debug mode
./scripts/test-interactive.sh debug
```

## Test Coverage

### Interactive Background Tests
- ✅ Particle rendering on homepage
- ✅ Mouse repulse effect interaction
- ✅ Click to add particles
- ✅ Responsive resize handling
- ✅ Cross-page functionality
- ✅ Performance metrics (FPS)

### Docker Features Tests
- ✅ Homepage feature cards
- ✅ Docker Hub repository display
- ✅ Build Cloud metrics
- ✅ Scout vulnerability scanning
- ✅ Compose YAML editor
- ✅ Swarm cluster visualization
- ✅ Desktop features
- ✅ Extensions marketplace
- ✅ Registry management
- ✅ Metrics dashboard
- ✅ Navigation between pages
- ✅ Mobile responsiveness

### Accessibility & Performance Tests
- ✅ Basic accessibility standards
- ✅ Page load time (<3s)
- ✅ Error handling (404 pages)
- ✅ No-JS fallback
- ✅ Slow network handling
- ✅ Memory usage stability
- ✅ SEO meta tags

## CI/CD Integration

Tests run automatically in GitHub Actions:

1. **On Push to Main**: Full test suite runs
2. **On Pull Requests**: Tests run with sharding for speed
3. **Manual Trigger**: Can run via workflow_dispatch

### GitHub Actions Workflows

- `deploy.yml`: Includes Playwright tests in deployment pipeline
- `playwright.yml`: Dedicated Playwright workflow with:
  - Parallel test execution (sharding)
  - Multi-browser testing (Chrome, Firefox, Safari)
  - Automatic PR comments with results
  - HTML report generation

## Browser Support

Tests run on:
- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)
- ✅ WebKit/Safari (Desktop)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## Debugging Failed Tests

When tests fail, Playwright provides:

1. **Screenshots**: Captured on failure
2. **Videos**: Recording of the test run
3. **Traces**: Full execution trace for debugging
4. **HTML Report**: Interactive report with all details

View artifacts:
```bash
# After test run
npm run test:e2e:report

# In CI, download artifacts from GitHub Actions
```

## Writing New Tests

Example test structure:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('#element')
    
    // Act
    await element.click()
    
    // Assert
    await expect(element).toBeVisible()
  })
})
```

## Best Practices

1. **Wait for elements**: Use `waitForSelector` or `waitForLoadState`
2. **Use data-testid**: Add test IDs to elements for reliable selection
3. **Avoid hard waits**: Use `waitForTimeout` sparingly
4. **Test user journeys**: Focus on real user workflows
5. **Keep tests independent**: Each test should run in isolation
6. **Use Page Object Model**: For complex pages, create page objects

## Performance Benchmarks

Target metrics:
- FPS: > 30 for particle animation
- LCP: < 2.5s (Largest Contentful Paint)
- Page Load: < 3s
- Memory: < 50MB increase during interaction

## Troubleshooting

### Tests timing out
- Increase timeout in `playwright.config.ts`
- Check if dev server is running
- Verify network connectivity

### Particles not visible
- Ensure tsParticles is properly initialized
- Check browser console for errors
- Verify Canvas API support

### CI failures
- Check GitHub Actions logs
- Download artifacts for debugging
- Run locally with same Node version

## Contributing

When adding new features:
1. Write E2E tests for the feature
2. Ensure tests pass locally
3. Update this README if needed
4. Tests must pass in CI before merge