import { test, expect } from '@playwright/test'

test('debug particles visibility', async ({ page }) => {
  // Navigate and wait for particles
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(2000)
  
  // Check console for errors
  page.on('console', msg => {
    console.log(`Console ${msg.type()}: ${msg.text()}`)
  })
  
  // Check if tsParticles is initialized
  const particlesInfo = await page.evaluate(() => {
    const tsP = (window as any).tsParticles
    if (!tsP) return { error: 'tsParticles not found on window' }
    
    // Get all containers
    const containers = tsP.domItem
    if (!containers || containers.length === 0) {
      return { error: 'No tsParticles containers found' }
    }
    
    // Get first container info
    const container = containers[0]
    return {
      id: container?.id,
      isPlaying: container?.isPlaying,
      particleCount: container?.particles?.count,
      canvas: {
        width: container?.canvas?.element?.width,
        height: container?.canvas?.element?.height,
      },
      actualOptions: container?.actualOptions,
      started: container?.started,
      destroyed: container?.destroyed,
      paused: container?.paused
    }
  })
  
  console.log('Particles Info:', JSON.stringify(particlesInfo, null, 2))
  
  // Try to manually start particles
  const startResult = await page.evaluate(() => {
    const tsP = (window as any).tsParticles
    if (tsP && tsP.domItem && tsP.domItem[0]) {
      tsP.domItem[0].play()
      return 'Attempted to start particles'
    }
    return 'Could not start particles'
  })
  
  console.log(startResult)
  
  await page.waitForTimeout(1000)
  
  // Check again after attempting to start
  const afterStart = await page.evaluate(() => {
    const container = (window as any).tsParticles?.domItem?.[0]
    return {
      isPlaying: container?.isPlaying,
      particleCount: container?.particles?.count,
      particlesArray: container?.particles?.array?.length
    }
  })
  
  console.log('After start:', afterStart)
  
  // Take screenshot
  await page.screenshot({ path: 'tests/screenshots/particles-debug.png' })
  
  // Check if canvas is actually drawing
  const canvasData = await page.evaluate(() => {
    const canvas = document.querySelector('#tsparticles canvas') as HTMLCanvasElement
    if (!canvas) return 'No canvas found'
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'No context'
    
    // Get image data to see if anything is drawn
    const imageData = ctx.getImageData(0, 0, 100, 100)
    const hasContent = imageData.data.some(pixel => pixel !== 0)
    
    return {
      hasContent,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      style: {
        width: canvas.style.width,
        height: canvas.style.height,
        display: canvas.style.display
      }
    }
  })
  
  console.log('Canvas data:', canvasData)
})