import { test } from '@playwright/test'

test('visual debug - compare test page vs main page', async ({ page }) => {
  // First check the working test page
  await page.goto('http://localhost:3000/test-particles')
  await page.waitForTimeout(2000)
  
  const testPageInfo = await page.evaluate(() => {
    const container = document.querySelector('#tsparticles-test')
    const canvas = document.querySelector('#tsparticles-test canvas') as HTMLCanvasElement
    return {
      containerExists: !!container,
      canvasExists: !!canvas,
      canvasSize: canvas ? { width: canvas.width, height: canvas.height } : null,
      zIndex: container ? window.getComputedStyle(container).zIndex : null,
      position: container ? window.getComputedStyle(container).position : null
    }
  })
  
  console.log('Test page particles:', testPageInfo)
  await page.screenshot({ path: 'tests/screenshots/working-test-page.png' })
  
  // Now check the main page
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(2000)
  
  const mainPageInfo = await page.evaluate(() => {
    const container = document.querySelector('#tsparticles')
    const canvas = document.querySelector('#tsparticles canvas') as HTMLCanvasElement
    const backgroundDiv = document.querySelector('.fixed.inset-0.-z-10')
    
    return {
      containerExists: !!container,
      canvasExists: !!canvas,
      canvasSize: canvas ? { width: canvas.width, height: canvas.height } : null,
      containerStyle: container ? {
        zIndex: window.getComputedStyle(container).zIndex,
        position: window.getComputedStyle(container).position,
        opacity: window.getComputedStyle(container).opacity,
        display: window.getComputedStyle(container).display,
        visibility: window.getComputedStyle(container).visibility
      } : null,
      backgroundDivStyle: backgroundDiv ? {
        zIndex: window.getComputedStyle(backgroundDiv).zIndex,
        position: window.getComputedStyle(backgroundDiv).position
      } : null
    }
  })
  
  console.log('Main page particles:', mainPageInfo)
  await page.screenshot({ path: 'tests/screenshots/broken-main-page.png' })
  
  // Try to fix z-index issues
  await page.evaluate(() => {
    const container = document.querySelector('#tsparticles') as HTMLElement
    if (container) {
      container.style.zIndex = '1'
      container.style.position = 'fixed'
      const canvas = container.querySelector('canvas') as HTMLCanvasElement
      if (canvas) {
        canvas.style.zIndex = '1'
      }
    }
  })
  
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'tests/screenshots/after-zindex-fix.png' })
  
  // Check if particles are actually being created
  const particleData = await page.evaluate(() => {
    const tsP = (window as any).tsParticles
    if (tsP && tsP.domItem) {
      const container = tsP.domItem(0)
      return {
        hasContainer: !!container,
        particleCount: container?.particles?.count || 0,
        isPlaying: container?.isPlaying || false
      }
    }
    return null
  })
  
  console.log('Particle data on main page:', particleData)
})