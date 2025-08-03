import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ParticleBackground from '../components/v2/ParticleBackground'
import AudioSystem, { useNarration } from '../components/v2/AudioSystem'

export default function HomeV2() {
  const [mounted, setMounted] = useState(false)
  const { narrate } = useNarration()

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      title: 'Docker Hub',
      description: 'Repository management & automated builds',
      link: '/docker-hub',
      icon: '🐳',
      color: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      title: 'Build Cloud',
      description: 'Accelerated multi-arch builds',
      link: '/build-cloud',
      icon: '☁️',
      color: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      title: 'Docker Scout',
      description: 'Real-time vulnerability scanning',
      link: '/scout',
      icon: '🔍',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2
    },
    {
      title: 'Docker Compose',
      description: 'Multi-container orchestration',
      link: '/compose',
      icon: '🎼',
      color: 'from-orange-500 to-red-500',
      delay: 0.3
    },
    {
      title: 'Docker Swarm',
      description: 'Cluster management & scaling',
      link: '/swarm',
      icon: '🐝',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.4
    },
    {
      title: 'Docker Desktop',
      description: 'Local development environment',
      link: '/desktop',
      icon: '💻',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    },
    {
      title: 'Extensions',
      description: 'Marketplace & integrations',
      link: '/extensions',
      icon: '🧩',
      color: 'from-pink-500 to-rose-500',
      delay: 0.6
    },
    {
      title: 'Registry',
      description: 'Private image management',
      link: '/registry',
      icon: '📦',
      color: 'from-teal-500 to-cyan-500',
      delay: 0.7
    },
    {
      title: 'Metrics',
      description: 'Real-time monitoring with Grafana',
      link: '/metrics',
      icon: '📊',
      color: 'from-violet-500 to-purple-500',
      delay: 0.8
    }
  ]

  return (
    <>
      <Head>
        <title>Docker Demo Showcase v2.0 - Interactive Experience</title>
        <meta name="description" content="Experience the Docker ecosystem with interactive demos, real-time metrics, and immersive visualizations" />
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      {mounted && (
        <>
          <ParticleBackground />
          <AudioSystem autoPlay={false} />
        </>
      )}

      <div className="min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50" />
          
          <div className="text-center z-10 px-4">
            <h1 className="text-7xl md:text-9xl font-black mb-6 animate-fade-in">
              <span className="heading-v2 glow-text">Docker</span>
              <br />
              <span className="text-white text-5xl md:text-6xl">Demo Showcase</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up"
               style={{ animationDelay: '0.2s' }}>
              Experience the complete Docker ecosystem through interactive demos, 
              real-time visualizations, and immersive learning
            </p>
            
            <div className="flex gap-4 justify-center animate-fade-in-up"
                 style={{ animationDelay: '0.4s' }}>
              <button 
                className="btn-primary-v2"
                onClick={() => {
                  narrate('Welcome to Docker Demo Showcase version 2.0. Explore nine powerful Docker features through interactive demonstrations.')
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Features
              </button>
              
              <Link href="/metrics">
                <button className="btn-v2 glass-card text-white hover:bg-white/20">
                  View Live Metrics
                </button>
              </Link>
            </div>
          </div>

          {/* Animated Docker Logo */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="loader-docker">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.847 4.93h2.118a.186.186 0 00.186-.185v-1.888a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185v-1.888a.185.185 0 00-.184-.185h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185v-1.888a.185.185 0 00-.185-.185H5.136a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.92 0h2.12a.185.185 0 00.184-.185v-1.888a.185.185 0 00-.184-.185H2.166a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.98-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" 
                      fill="#2496ED" className="animate-pulse"/>
              </svg>
            </div>
          </div>

          <div className="wave-bg" />
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16">
              <span className="heading-v2">Explore the Ecosystem</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link key={feature.title} href={feature.link}>
                  <div 
                    className="glass-card p-8 cursor-pointer card-3d hover-lift group"
                    style={{ 
                      animationDelay: `${feature.delay}s`,
                      animation: 'fadeInUp 0.8s ease-out forwards',
                      opacity: 0
                    }}
                    onMouseEnter={() => narrate(`${feature.title}: ${feature.description}`)}
                  >
                    <div className={`text-6xl mb-4 float-animation`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.color}">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-cyan-400 group-hover:text-cyan-300">
                      <span className="mr-2">Explore</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card p-12">
              <h2 className="text-4xl font-bold text-center mb-8">
                <span className="heading-v2">What's New in v2.0</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Interactive Visualizations</h3>
                      <p className="text-gray-300">Real-time metrics and data visualization with Grafana integration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🎵</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Audio Experience</h3>
                      <p className="text-gray-300">Theme music and voice narration for immersive learning</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Enhanced Features</h3>
                      <p className="text-gray-300">6 new Docker ecosystem showcases including Compose, Swarm, and more</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Modern Design</h3>
                      <p className="text-gray-300">Glassmorphism, particle effects, and smooth animations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📱</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Responsive Experience</h3>
                      <p className="text-gray-300">Optimized for all devices with touch interactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Live Updates</h3>
                      <p className="text-gray-300">Real-time data streaming and WebSocket connections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}