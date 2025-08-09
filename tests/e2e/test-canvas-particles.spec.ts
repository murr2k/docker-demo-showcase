import { test } from '@playwright/test'

test('test canvas particles animation', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(2000)
  
  // Take initial screenshot
  await page.screenshot({ path: 'tests/screenshots/canvas-particles-1.png' })
  
  // Move mouse to trigger repulse effect
  await page.mouse.move(640, 360)
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'tests/screenshots/canvas-particles-2.png' })
  
  // Move mouse in a circle
  for (let angle = 0; angle <= 360; angle += 45) {
    const x = 640 + 200 * Math.cos(angle * Math.PI / 180)
    const y = 360 + 200 * Math.sin(angle * Math.PI / 180)
    await page.mouse.move(x, y)
    await page.waitForTimeout(100)
  }
  
  await page.screenshot({ path: 'tests/screenshots/canvas-particles-3.png' })
  
  console.log('Canvas particles test complete - check screenshots')
})