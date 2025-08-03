import { useState } from 'react'
import Head from 'next/head'
import ParticleBackground from '../components/v2/ParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

export default function DockerDesktop() {
  const [activeFeature, setActiveFeature] = useState('dashboard')
  const { narrate } = useNarration()

  const features = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'containers', name: 'Containers', icon: '📦' },
    { id: 'images', name: 'Images', icon: '🖼️' },
    { id: 'volumes', name: 'Volumes', icon: '💾' },
    { id: 'dev-environments', name: 'Dev Environments', icon: '👩‍💻' },
    { id: 'kubernetes', name: 'Kubernetes', icon: '☸️' }
  ]

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">System Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="text-4xl mb-2">🐳</div>
                <p className="text-gray-400">Docker Engine</p>
                <p className="text-2xl font-bold text-green-400">Running</p>
              </div>
              <div className="glass-card p-4">
                <div className="text-4xl mb-2">💻</div>
                <p className="text-gray-400">Resources</p>
                <p className="text-xl text-cyan-400">4 CPUs • 8GB RAM</p>
              </div>
            </div>
          </div>
        )
      case 'containers':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Running Containers</h3>
            {['web-app', 'database', 'cache'].map((container, i) => (
              <div key={container} className="glass-card p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{container}</p>
                  <p className="text-sm text-gray-400">Port {3000 + i}</p>
                </div>
                <span className="text-green-400">● Running</span>
              </div>
            ))}
          </div>
        )
      case 'dev-environments':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Development Environments</h3>
            <div className="glass-card p-6">
              <h4 className="text-xl font-semibold text-cyan-400 mb-3">One-Click Setup</h4>
              <p className="text-gray-300 mb-4">
                Create consistent development environments with pre-configured tools and dependencies
              </p>
              <button className="btn-primary-v2">Create New Environment</button>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>Select a feature to explore</p>
          </div>
        )
    }
  }

  return (
    <>
      <Head>
        <title>Docker Desktop - Local Development</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <ParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Desktop</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            The fastest way to containerize applications on your desktop
          </p>

          <div className="glass-card p-2 mb-8">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm">Docker Desktop v4.25</span>
            </div>
            
            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-700 p-4">
                <nav className="space-y-2">
                  {features.map(feature => (
                    <button
                      key={feature.id}
                      onClick={() => {
                        setActiveFeature(feature.id)
                        narrate(`Viewing ${feature.name} in Docker Desktop`)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                        activeFeature === feature.id
                          ? 'bg-docker-blue/20 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <span>{feature.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 p-8">
                {renderFeatureContent()}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">One-Click Install</h3>
              <p className="text-gray-300">Get Docker running on your desktop in minutes</p>
            </div>
            
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-2">Auto Updates</h3>
              <p className="text-gray-300">Stay current with automatic Docker engine updates</p>
            </div>
            
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Dev Tools</h3>
              <p className="text-gray-300">Integrated tools for building and debugging</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}