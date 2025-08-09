import { test } from '@playwright/test'

test('open test-particles page and check', async ({ page }) => {
  await page.goto('http://localhost:3000/test-particles')
  await page.waitForTimeout(3000)
  
  // Take screenshot
  await page.screenshot({ path: 'tests/screenshots/test-particles.png' })
  
  // Log console messages
  page.on('console', msg => console.log(`Console: ${msg.text()}`))
  
  // Check status
  const status = await page.locator('text=Status:').textContent()
  console.log('Page status:', status)
  
  // Click play button
  await page.click('button:has-text("Play Particles")')
  await page.waitForTimeout(2000)
  
  await page.screenshot({ path: 'tests/screenshots/test-particles-after.png' })
})