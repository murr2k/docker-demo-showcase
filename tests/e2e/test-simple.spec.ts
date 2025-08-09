import { test } from '@playwright/test'

test('test simple particles page', async ({ page }) => {
  await page.goto('http://localhost:3000/simple-particles')
  await page.waitForTimeout(2000)
  
  // Take screenshot
  await page.screenshot({ path: 'tests/screenshots/simple-particles.png', fullPage: true })
  
  // Check if canvas exists and has content
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement
    if (!canvas) return { exists: false }
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return { exists: true, hasContext: false }
    
    // Check if canvas has been drawn to
    const imageData = ctx.getImageData(0, 0, 100, 100)
    const hasContent = imageData.data.some((pixel, i) => {
      // Check alpha channel (every 4th value)
      if (i % 4 === 3) return pixel > 0
      return false
    })
    
    return {
      exists: true,
      hasContext: true,
      width: canvas.width,
      height: canvas.height,
      hasContent
    }
  })
  
  console.log('Canvas info:', canvasInfo)
})