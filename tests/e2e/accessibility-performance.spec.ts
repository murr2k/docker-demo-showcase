import { test, expect } from '@playwright/test'

test.describe('Accessibility and Performance', () => {
  test('homepage should meet basic accessibility standards', async ({ page }) => {
    await page.goto('/')
    
    // Basic accessibility checks without axe-playwright
    // Check for alt text on images
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      if (await img.isVisible()) {
        expect(alt).toBeTruthy()
      }
    }
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)
    
    // Check for keyboard navigation
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })

  test('pages should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
    
    // Check for largest contentful paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ type: 'largest-contentful-paint', buffered: true })
      })
    }).catch(() => null)
    
    if (lcp && typeof lcp === 'number') {
      // LCP should be under 2.5 seconds for good performance
      expect(lcp).toBeLessThan(2500)
    }
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Try to navigate to a non-existent page
    const response = await page.goto('/non-existent-page')
    
    // Should return 404
    expect(response?.status()).toBe(404)
    
    // Error page should be user-friendly
    const bodyText = await page.textContent('body')
    expect(bodyText).toContain('404')
  })

  test('should work without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false
    })
    const page = await context.newPage()
    
    await page.goto('/')
    
    // Core content should still be visible
    const heading = await page.locator('h1').textContent()
    expect(heading).toContain('Docker')
    
    await context.close()
  })

  test('should handle slow network gracefully', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100))
      await route.continue()
    })
    
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    
    // Page should still be interactive
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
  })

  test('memory usage should be stable', async ({ page }) => {
    await page.goto('/')
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize
      }
      return null
    })
    
    if (initialMemory) {
      // Interact with the page
      await page.mouse.move(100, 100)
      await page.mouse.move(200, 200)
      await page.mouse.move(300, 300)
      await page.waitForTimeout(2000)
      
      // Get memory after interactions
      const finalMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize
        }
        return null
      })
      
      if (finalMemory) {
        // Memory increase should be reasonable (less than 50MB)
        const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024
        expect(memoryIncrease).toBeLessThan(50)
      }
    }
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential meta tags
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(10)
    
    const description = await page.getAttribute('meta[name="description"]', 'content')
    expect(description).toBeTruthy()
    expect(description?.length).toBeGreaterThan(50)
    
    // Check for Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content')
    expect(ogTitle).toBeTruthy()
    
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content')
    expect(ogDescription).toBeTruthy()
  })
})