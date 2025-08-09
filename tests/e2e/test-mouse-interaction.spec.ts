import { test } from '@playwright/test'

test('test mouse interaction with particles', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(2000)
  
  // Log mouse position for debugging
  await page.evaluate(() => {
    let mousePos = { x: 0, y: 0 }
    window.addEventListener('mousemove', (e) => {
      mousePos = { x: e.clientX, y: e.clientY }
      console.log('Mouse position:', mousePos)
    })
    ;(window as any).getMousePos = () => mousePos
  })
  
  // Move mouse to center
  await page.mouse.move(640, 360)
  await page.waitForTimeout(500)
  
  const mousePos1 = await page.evaluate(() => (window as any).getMousePos())
  console.log('Mouse at center:', mousePos1)
  
  // Move mouse around
  const positions = [
    { x: 400, y: 300 },
    { x: 800, y: 300 },
    { x: 800, y: 500 },
    { x: 400, y: 500 }
  ]
  
  for (const pos of positions) {
    await page.mouse.move(pos.x, pos.y)
    await page.waitForTimeout(300)
    const currentPos = await page.evaluate(() => (window as any).getMousePos())
    console.log(`Mouse moved to:`, currentPos)
  }
  
  // Take final screenshot
  await page.screenshot({ path: 'tests/screenshots/mouse-interaction.png' })
  
  console.log('Mouse interaction test complete')
})