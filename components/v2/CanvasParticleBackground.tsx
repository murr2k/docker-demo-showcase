import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function CanvasParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Initialize particles randomly
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 100
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse tracking - use window instead of canvas
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    // Track mouse on window level since canvas might be behind content
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop
    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Repulse effect from mouse - reduced sensitivity
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 2
          particle.vy -= Math.sin(angle) * force * 2
        }
        
        // Apply damping
        particle.vx *= 0.95
        particle.vy *= 0.95
        
        // Keep particles moving slightly
        if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * 0.5
        if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * 0.5
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity + 0.2})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 150) * 0.15})`
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

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ 
          mixBlendMode: 'screen',
          pointerEvents: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
    </div>
  )
}