import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function InteractiveParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const spacing = 30
      const margin = 50
      const cols = Math.floor((canvas.width - margin * 2) / spacing)
      const rows = Math.floor((canvas.height - margin * 2) / spacing)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = margin + i * spacing + (j % 2) * (spacing / 2)
          const y = margin + j * spacing
          
          particlesRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: 2,
            opacity: 0.6
          })
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchend', handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(36, 150, 237, 0.02)')
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)')
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const repelForce = force * 30
          
          particle.vx -= Math.cos(angle) * repelForce * 0.02
          particle.vy -= Math.sin(angle) * repelForce * 0.02
        }

        // Return to base position with spring physics
        const returnX = (particle.baseX - particle.x) * 0.05
        const returnY = (particle.baseY - particle.y) * 0.05
        
        particle.vx += returnX
        particle.vy += returnY
        
        // Apply damping
        particle.vx *= 0.92
        particle.vy *= 0.92
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Calculate dynamic opacity based on displacement
        const displacement = Math.sqrt(
          Math.pow(particle.x - particle.baseX, 2) + 
          Math.pow(particle.y - particle.baseY, 2)
        )
        particle.opacity = Math.max(0.2, 0.6 - displacement * 0.002)

        // Draw particle
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#2496ed'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle) => {
          if (particle === otherParticle) return
          
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 60) {
            const opacity = (1 - distance / 60) * 0.15
            ctx.globalAlpha = opacity
            ctx.strokeStyle = '#2496ed'
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

    return () => {
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
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: 'none' }}
      />
    </div>
  )
}