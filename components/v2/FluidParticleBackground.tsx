import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function FluidParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false })
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const gradientCanvas = gradientCanvasRef.current
    if (!canvas || !gradientCanvas) return

    // Firefox compatibility: use standard 2d context
    const ctx = canvas.getContext('2d')
    const gradientCtx = gradientCanvas.getContext('2d')
    if (!ctx || !gradientCtx) return

    const resizeCanvas = () => {
      // Store dimensions before setting
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Set canvas dimensions
      canvas.width = width
      canvas.height = height
      gradientCanvas.width = width
      gradientCanvas.height = height
      
      // Only initialize particles once or on resize
      if (!isInitializedRef.current || particlesRef.current.length === 0) {
        initParticles()
        isInitializedRef.current = true
      } else {
        // Reposition particles on resize
        initParticles()
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      const gridSize = 25
      const margin = 50
      const cols = Math.floor((canvas.width - margin * 2) / gridSize) + 1
      const rows = Math.floor((canvas.height - margin * 2) / gridSize) + 1

      const colors = ['#2496ed', '#4ba9f5', '#7c3aed', '#ec4899', '#00d9ff']

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = margin + i * gridSize
          const y = margin + j * gridSize
          
          // Add some randomness to initial positions
          const offsetX = (Math.random() - 0.5) * 10
          const offsetY = (Math.random() - 0.5) * 10
          
          particlesRef.current.push({
            x: x + offsetX,
            y: y + offsetY,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            radius: 1.5 + Math.random() * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Use mouse events for better Firefox compatibility
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          isActive: true
        }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    // Use both mouse and touch events for broader compatibility
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchend', handleMouseLeave)

    const drawAnimatedGradient = () => {
      const time = timeRef.current * 0.001
      
      // Create multiple gradient layers for depth
      gradientCtx.clearRect(0, 0, gradientCanvas.width, gradientCanvas.height)
      
      // Base gradient
      const baseGradient = gradientCtx.createLinearGradient(
        0, 0, 
        gradientCanvas.width, gradientCanvas.height
      )
      baseGradient.addColorStop(0, 'rgba(15, 23, 42, 1)')
      baseGradient.addColorStop(0.5, 'rgba(30, 41, 59, 1)')
      baseGradient.addColorStop(1, 'rgba(15, 23, 42, 1)')
      gradientCtx.fillStyle = baseGradient
      gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height)
      
      // Animated color spots
      for (let i = 0; i < 3; i++) {
        const x = (Math.sin(time + i * 2) * 0.5 + 0.5) * gradientCanvas.width
        const y = (Math.cos(time * 0.7 + i * 1.5) * 0.5 + 0.5) * gradientCanvas.height
        
        const spotGradient = gradientCtx.createRadialGradient(
          x, y, 0,
          x, y, 300
        )
        
        const hue = (time * 20 + i * 120) % 360
        spotGradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.1)`)
        spotGradient.addColorStop(1, 'transparent')
        
        gradientCtx.fillStyle = spotGradient
        gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height)
      }
    }

    const animate = () => {
      timeRef.current++
      
      // Update gradient background
      drawAnimatedGradient()
      
      // Clear particle canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction with smooth falloff
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 120
          
          if (distance < maxDistance && distance > 0) {
            const force = Math.pow(1 - distance / maxDistance, 2)
            const angle = Math.atan2(dy, dx)
            const pushForce = force * 40
            
            particle.vx -= Math.cos(angle) * pushForce * 0.015
            particle.vy -= Math.sin(angle) * pushForce * 0.015
          }
        }

        // Natural floating motion
        const floatX = Math.sin(timeRef.current * 0.002 + index * 0.1) * 0.1
        const floatY = Math.cos(timeRef.current * 0.002 + index * 0.15) * 0.1
        
        // Spring force back to base position
        const springX = (particle.baseX - particle.x) * 0.02
        const springY = (particle.baseY - particle.y) * 0.02
        
        particle.vx += springX + floatX
        particle.vy += springY + floatY
        
        // Damping for smooth motion
        particle.vx *= 0.94
        particle.vy *= 0.94
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Calculate dynamic properties based on velocity
        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const dynamicRadius = particle.radius + velocity * 0.2
        const opacity = Math.min(0.8, 0.3 + velocity * 0.05)

        // Draw particle with glow effect
        ctx.globalAlpha = opacity
        
        // Glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, dynamicRadius * 4
        )
        glowGradient.addColorStop(0, particle.color + '40')
        glowGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, dynamicRadius * 4, 0, Math.PI * 2)
        ctx.fill()
        
        // Core dot
        ctx.globalAlpha = opacity * 1.5
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, dynamicRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxConnectionDistance = 50
          
          if (distance < maxConnectionDistance) {
            const opacity = Math.pow(1 - distance / maxConnectionDistance, 2) * 0.2
            ctx.globalAlpha = opacity
            
            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            lineGradient.addColorStop(0, particle.color)
            lineGradient.addColorStop(1, otherParticle.color)
            
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation with a small delay to ensure everything is initialized
    const startAnimation = () => {
      animate()
    }
    
    // Use setTimeout to ensure DOM is ready in Firefox
    const timeoutId = setTimeout(startAnimation, 10)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchend', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ pointerEvents: 'none' }}>
      <canvas
        ref={gradientCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          cursor: 'crosshair',
          pointerEvents: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}