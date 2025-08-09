import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import type { Engine, Container } from '@tsparticles/engine'
// Use the full tsparticles bundle
import { loadFull } from 'tsparticles'

export default function TsParticlesBackground() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    // Load the full tsParticles bundle
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('Particles container:', container)
  }, [])

  if (!isReady) return null

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent'
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
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
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: false,
              speed: 6,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 80
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: { min: 1, max: 5 }
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0"
      />
    </div>
  )
}