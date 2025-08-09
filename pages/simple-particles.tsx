import { useEffect } from 'react'

export default function SimpleParticles() {
  useEffect(() => {
    // Create a simple canvas-based particle system without tsParticles
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.radius = Math.random() * 2 + 1
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy
      }
      
      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div className="fixed inset-0 bg-gray-900">
      <canvas 
        id="particle-canvas" 
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Simple Particle Test</h1>
        <p>This uses a basic canvas implementation without tsParticles</p>
      </div>
    </div>
  )
}