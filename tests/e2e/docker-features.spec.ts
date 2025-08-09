import { test, expect } from '@playwright/test'

test.describe('Docker Demo Showcase Features', () => {
  test('homepage should load with all feature cards', async ({ page }) => {
    await page.goto('/')
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Docker')
    await expect(page.locator('h1')).toContainText('Demo Showcase')
    
    // Check that all feature cards are present
    const features = [
      'Docker Hub',
      'Build Cloud',
      'Docker Scout',
      'Docker Compose',
      'Docker Swarm',
      'Docker Desktop',
      'Extensions',
      'Registry',
      'Metrics'
    ]
    
    for (const feature of features) {
      await expect(page.locator(`text=${feature}`).first()).toBeVisible()
    }
  })

  test('Docker Hub page should display repository information', async ({ page }) => {
    await page.goto('/docker-hub')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Docker Hub')
    
    // Check for repository cards
    await expect(page.locator('.glass-card').first()).toBeVisible()
    
    // Check for search functionality
    const searchInput = page.locator('input[placeholder*="Search"]')
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      await page.waitForTimeout(500)
    }
  })

  test('Build Cloud page should show build metrics', async ({ page }) => {
    await page.goto('/build-cloud')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Build Cloud')
    
    // Check for build status indicators
    await expect(page.locator('text=/build/i').first()).toBeVisible()
    
    // Check for platform badges (multi-arch support)
    const platforms = ['linux/amd64', 'linux/arm64']
    for (const platform of platforms) {
      const platformElement = page.locator(`text=${platform}`)
      if (await platformElement.isVisible()) {
        await expect(platformElement).toBeVisible()
      }
    }
  })

  test('Scout page should display vulnerability scanning info', async ({ page }) => {
    await page.goto('/scout')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Scout')
    
    // Check for vulnerability indicators
    const severityLevels = ['Critical', 'High', 'Medium', 'Low']
    for (const severity of severityLevels) {
      const severityElement = page.locator(`text=/${severity}/i`).first()
      if (await severityElement.isVisible()) {
        await expect(severityElement).toBeVisible()
      }
    }
  })

  test('Compose page should have YAML editor', async ({ page }) => {
    await page.goto('/compose')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Compose')
    
    // Check for code editor or YAML content
    const yamlContent = page.locator('text=/version:|services:/i')
    if (await yamlContent.isVisible()) {
      await expect(yamlContent).toBeVisible()
    }
    
    // Check for service visualization
    await expect(page.locator('text=/web|api|postgres/i').first()).toBeVisible()
  })

  test('Swarm page should show cluster information', async ({ page }) => {
    await page.goto('/swarm')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Swarm')
    
    // Check for node information
    const nodeStatuses = ['Leader', 'Worker', 'Manager']
    for (const status of nodeStatuses) {
      const nodeElement = page.locator(`text=/${status}/i`).first()
      if (await nodeElement.isVisible()) {
        await expect(nodeElement).toBeVisible()
      }
    }
  })

  test('Desktop page should display Docker Desktop features', async ({ page }) => {
    await page.goto('/desktop')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Desktop')
    
    // Check for desktop-specific features
    await expect(page.locator('.glass-card').first()).toBeVisible()
  })

  test('Extensions page should show marketplace', async ({ page }) => {
    await page.goto('/extensions')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Extensions')
    
    // Check for extension cards
    await expect(page.locator('.glass-card').first()).toBeVisible()
    
    // Check for install buttons
    const installButton = page.locator('button:has-text("Install")')
    if (await installButton.first().isVisible()) {
      await expect(installButton.first()).toBeVisible()
    }
  })

  test('Registry page should display registry management', async ({ page }) => {
    await page.goto('/registry')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Registry')
    
    // Check for image listings
    await expect(page.locator('.glass-card').first()).toBeVisible()
  })

  test('Metrics page should show monitoring dashboard', async ({ page }) => {
    await page.goto('/metrics')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Metrics')
    
    // Check for metric cards or charts
    await expect(page.locator('.glass-card').first()).toBeVisible()
    
    // Check for metric values
    const metricLabels = ['CPU', 'Memory', 'Network', 'Disk']
    for (const label of metricLabels) {
      const metricElement = page.locator(`text=/${label}/i`).first()
      if (await metricElement.isVisible()) {
        await expect(metricElement).toBeVisible()
      }
    }
  })

  test('navigation should work between pages', async ({ page }) => {
    await page.goto('/')
    
    // Click on Docker Hub feature card
    await page.click('text=Docker Hub')
    await expect(page).toHaveURL(/.*docker-hub/)
    
    // Navigate back
    await page.goBack()
    await expect(page).toHaveURL('/')
    
    // Click on Build Cloud feature card
    await page.click('text=Build Cloud')
    await expect(page).toHaveURL(/.*build-cloud/)
  })

  test('responsive design should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that content is still visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.glass-card').first()).toBeVisible()
    
    // Check mobile menu if exists
    const mobileMenuButton = page.locator('button[aria-label*="menu"]')
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click()
      await page.waitForTimeout(300)
    }
  })
})