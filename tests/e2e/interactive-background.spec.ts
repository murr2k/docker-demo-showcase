import { test, expect } from '@playwright/test'

test.describe('Interactive Particle Background', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for particles to load
    await page.waitForSelector('#tsparticles', { state: 'visible' })
    await page.waitForTimeout(1000) // Allow particles to initialize
  })

  test('should render particle background on homepage', async ({ page }) => {
    // Check if the tsparticles container exists
    const particlesContainer = await page.locator('#tsparticles')
    await expect(particlesContainer).toBeVisible()
    
    // Check if canvas is present
    const canvas = await page.locator('#tsparticles canvas')
    await expect(canvas).toBeVisible()
  })

  test('particles should respond to mouse movement (repulse effect)', async ({ page }) => {
    // Get canvas element
    const canvas = await page.locator('#tsparticles canvas')
    const box = await canvas.boundingBox()
    
    if (!box) {
      throw new Error('Canvas bounding box not found')
    }

    // Take initial screenshot
    const screenshotBefore = await canvas.screenshot()
    
    // Move mouse to center of canvas to trigger repulse effect
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(500) // Wait for animation
    
    // Move mouse in a pattern to test particle interaction
    await page.mouse.move(box.x + box.width / 4, box.y + box.height / 4)
    await page.waitForTimeout(200)
    await page.mouse.move(box.x + box.width * 3/4, box.y + box.height * 3/4)
    await page.waitForTimeout(200)
    
    // Take screenshot after mouse movement
    const screenshotAfter = await canvas.screenshot()
    
    // Compare screenshots - they should be different due to particle movement
    expect(screenshotBefore).not.toEqual(screenshotAfter)
  })

  test('clicking should add new particles', async ({ page }) => {
    const canvas = await page.locator('#tsparticles canvas')
    const box = await canvas.boundingBox()
    
    if (!box) {
      throw new Error('Canvas bounding box not found')
    }

    // Take screenshot before clicking
    const screenshotBefore = await canvas.screenshot()
    
    // Click multiple times to add particles
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(100)
    await page.mouse.click(box.x + box.width / 3, box.y + box.height / 3)
    await page.waitForTimeout(100)
    await page.mouse.click(box.x + box.width * 2/3, box.y + box.height * 2/3)
    await page.waitForTimeout(500)
    
    // Take screenshot after clicking
    const screenshotAfter = await canvas.screenshot()
    
    // Screenshots should be different after adding particles
    expect(screenshotBefore).not.toEqual(screenshotAfter)
  })

  test('background should be responsive to window resize', async ({ page }) => {
    // Set initial viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForTimeout(500)
    
    const canvasInitial = await page.locator('#tsparticles canvas')
    const initialBox = await canvasInitial.boundingBox()
    
    // Resize viewport
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.waitForTimeout(1000) // Wait for resize and re-render
    
    const canvasResized = await page.locator('#tsparticles canvas')
    const resizedBox = await canvasResized.boundingBox()
    
    // Canvas should have resized
    expect(resizedBox?.width).toBeLessThan(initialBox?.width || 0)
    expect(resizedBox?.height).toBeLessThan(initialBox?.height || 0)
  })

  test('particles background should work on v2 pages', async ({ page }) => {
    // Test pages that use the new v2 layout with particles
    const v2Pages = [
      '/',
      '/compose',
      '/swarm',
      '/desktop',
      '/extensions',
      '/registry',
      '/metrics'
    ]

    for (const pagePath of v2Pages) {
      await page.goto(pagePath)
      
      // Wait for page to load
      await page.waitForLoadState('networkidle')
      
      // Check if particles are rendered on v2 pages
      const particlesContainer = await page.locator('#tsparticles')
      const isVisible = await particlesContainer.isVisible().catch(() => false)
      
      if (isVisible) {
        // Verify canvas is present and rendering
        const canvas = await page.locator('#tsparticles canvas')
        await expect(canvas).toBeVisible()
      } else {
        // Some pages might not have particles, log it
        console.log(`Note: ${pagePath} doesn't have particle background`)
      }
    }
    
    // At least the homepage should have particles
    await page.goto('/')
    const homepageParticles = await page.locator('#tsparticles')
    await expect(homepageParticles).toBeVisible({ timeout: 5000 })
  })

  test('performance: particles should maintain smooth animation', async ({ page }) => {
    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0
        let startTime = performance.now()
        
        function countFrames() {
          frameCount++
          
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames)
          } else {
            resolve({
              fps: frameCount,
              duration: performance.now() - startTime
            })
          }
        }
        
        requestAnimationFrame(countFrames)
      })
    })
    
    // Should maintain at least 30 FPS
    expect(metrics.fps).toBeGreaterThan(30)
  })
})