import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

test.describe('Debug Demo - Visual Testing', () => {
  test.setTimeout(60000) // Extend timeout for debugging
  
  test('observe and debug the interactive background', async ({ page, context }) => {
    console.log('🔍 Starting demo debugging...')
    
    // Enable console logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text())
      }
    })
    
    page.on('pageerror', error => {
      console.log('❌ Page Error:', error.message)
    })
    
    // Navigate to homepage
    console.log('📍 Navigating to homepage...')
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    
    // Take initial screenshot
    console.log('📸 Taking initial screenshot...')
    await page.screenshot({ 
      path: 'tests/screenshots/01-initial-load.png',
      fullPage: true 
    })
    
    // Check if particles container exists
    console.log('🔍 Checking for particles container...')
    const particlesContainer = await page.locator('#tsparticles')
    const containerExists = await particlesContainer.count() > 0
    console.log(`✅ Particles container exists: ${containerExists}`)
    
    if (containerExists) {
      // Get container properties
      const containerInfo = await particlesContainer.evaluate((el) => {
        const rect = el.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(el)
        return {
          width: rect.width,
          height: rect.height,
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          display: computedStyle.display,
          visibility: computedStyle.visibility,
          opacity: computedStyle.opacity
        }
      })
      console.log('📊 Container properties:', containerInfo)
      
      // Check for canvas
      const canvas = await page.locator('#tsparticles canvas')
      const canvasCount = await canvas.count()
      console.log(`🎨 Canvas elements found: ${canvasCount}`)
      
      if (canvasCount > 0) {
        const canvasInfo = await canvas.first().evaluate((el: HTMLCanvasElement) => {
          return {
            width: el.width,
            height: el.height,
            clientWidth: el.clientWidth,
            clientHeight: el.clientHeight,
            isConnected: el.isConnected
          }
        })
        console.log('🎨 Canvas properties:', canvasInfo)
      }
    }
    
    // Test mouse interaction
    console.log('🖱️ Testing mouse interaction...')
    
    // Get viewport size
    const viewport = page.viewportSize()
    if (!viewport) throw new Error('No viewport size')
    
    // Take screenshot before mouse movement
    await page.screenshot({ 
      path: 'tests/screenshots/02-before-mouse.png',
      fullPage: false 
    })
    
    // Move mouse to center
    console.log('Moving mouse to center...')
    await page.mouse.move(viewport.width / 2, viewport.height / 2)
    await page.waitForTimeout(500)
    
    await page.screenshot({ 
      path: 'tests/screenshots/03-mouse-center.png',
      fullPage: false 
    })
    
    // Move mouse in a circle pattern
    console.log('Moving mouse in circle pattern...')
    const centerX = viewport.width / 2
    const centerY = viewport.height / 2
    const radius = 100
    
    for (let angle = 0; angle <= 360; angle += 30) {
      const x = centerX + radius * Math.cos(angle * Math.PI / 180)
      const y = centerY + radius * Math.sin(angle * Math.PI / 180)
      await page.mouse.move(x, y)
      await page.waitForTimeout(50)
    }
    
    await page.screenshot({ 
      path: 'tests/screenshots/04-after-circle.png',
      fullPage: false 
    })
    
    // Test clicking to add particles
    console.log('🖱️ Testing click to add particles...')
    await page.mouse.click(centerX, centerY)
    await page.waitForTimeout(200)
    await page.mouse.click(centerX + 100, centerY)
    await page.waitForTimeout(200)
    await page.mouse.click(centerX - 100, centerY)
    await page.waitForTimeout(500)
    
    await page.screenshot({ 
      path: 'tests/screenshots/05-after-clicks.png',
      fullPage: false 
    })
    
    // Check for any tsParticles errors
    const tsParticlesErrors = await page.evaluate(() => {
      return (window as any).tsParticles ? 
        'tsParticles is loaded' : 
        'tsParticles is NOT loaded'
    })
    console.log(`📦 ${tsParticlesErrors}`)
    
    // Get particle count if possible
    try {
      const particleInfo = await page.evaluate(() => {
        const container = (window as any).tsParticles?.domItem(0)
        if (container) {
          return {
            particleCount: container.particles?.count || 0,
            isPlaying: container.isPlaying || false,
            fps: container.fpsLimit || 0
          }
        }
        return null
      })
      if (particleInfo) {
        console.log('🎯 Particle info:', particleInfo)
      }
    } catch (e) {
      console.log('Could not get particle info')
    }
    
    // Test on different pages
    const pagesToTest = ['/compose', '/swarm', '/metrics']
    
    for (const pagePath of pagesToTest) {
      console.log(`\n📍 Testing ${pagePath}...`)
      await page.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1000)
      
      const hasParticles = await page.locator('#tsparticles').count() > 0
      console.log(`✅ ${pagePath} has particles: ${hasParticles}`)
      
      await page.screenshot({ 
        path: `tests/screenshots/page-${pagePath.replace('/', '')}.png`,
        fullPage: false 
      })
    }
    
    // Return to homepage for final test
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    
    // Performance check
    console.log('\n📊 Checking performance...')
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0
        const startTime = performance.now()
        
        function countFrames() {
          frameCount++
          
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames)
          } else {
            const fps = frameCount
            
            // Get memory if available
            let memory = null
            if ('memory' in performance) {
              memory = {
                usedJSHeapSize: (performance as any).memory.usedJSHeapSize / 1024 / 1024,
                totalJSHeapSize: (performance as any).memory.totalJSHeapSize / 1024 / 1024
              }
            }
            
            resolve({
              fps,
              memory,
              duration: performance.now() - startTime
            })
          }
        }
        
        requestAnimationFrame(countFrames)
      })
    })
    
    console.log('🎮 Performance metrics:', performanceMetrics)
    
    // Final observations
    console.log('\n📝 Debug Summary:')
    console.log('- Homepage loaded successfully')
    console.log('- Screenshots saved to tests/screenshots/')
    console.log('- Check screenshots to verify particle visibility and interaction')
    
    // Create summary report
    const summary = {
      timestamp: new Date().toISOString(),
      particlesFound: containerExists,
      canvasCount: await page.locator('#tsparticles canvas').count(),
      performance: performanceMetrics,
      screenshotsTaken: [
        '01-initial-load.png',
        '02-before-mouse.png',
        '03-mouse-center.png',
        '04-after-circle.png',
        '05-after-clicks.png'
      ]
    }
    
    // Save summary
    const summaryPath = path.join('tests', 'screenshots', 'debug-summary.json')
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
    console.log(`\n📄 Summary saved to ${summaryPath}`)
  })
})