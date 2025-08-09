import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import type { Engine, Container } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

export default function TestParticles() {
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    setReady(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    setStatus('Loading tsParticles engine...')
    await loadSlim(engine)
    setStatus('Engine loaded')
    console.log('tsParticles engine loaded')
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      setStatus(`Container loaded with ${container.particles?.count || 0} particles`)
      console.log('Container loaded:', container)
      container.play()
      
      // Log to window for debugging
      (window as any).particlesContainer = container
    }
  }, [])

  if (!ready) return <div>Loading...</div>

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-4 left-4 bg-black/50 text-white p-4 rounded z-50">
        <h2 className="text-xl font-bold mb-2">Particles Debug</h2>
        <p>Status: {status}</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 rounded"
          onClick={() => {
            const container = (window as any).particlesContainer
            if (container) {
              container.play()
              setStatus('Playing particles')
            }
          }}
        >
          Play Particles
        </button>
      </div>
      
      <div className="fixed inset-0 bg-gray-900">
        <Particles
          id="tsparticles-test"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fullScreen: false,
            autoPlay: true,
            background: {
              color: {
                value: '#000000'
              }
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: '#ffffff'
              },
              links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                outModes: {
                  default: 'bounce'
                }
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 100
              },
              opacity: {
                value: 0.7
              },
              shape: {
                type: 'circle'
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'repulse'
                },
                onClick: {
                  enable: true,
                  mode: 'push'
                }
              },
              modes: {
                repulse: {
                  distance: 100
                },
                push: {
                  quantity: 4
                }
              }
            },
            detectRetina: true
          }}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}