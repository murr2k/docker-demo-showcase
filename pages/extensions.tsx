import { useState } from 'react'
import Head from 'next/head'
import CanvasParticleBackground from '../components/v2/CanvasParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

export default function DockerExtensions() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([])
  const { narrate } = useNarration()

  const categories = [
    { id: 'all', name: 'All Extensions', count: 150 },
    { id: 'security', name: 'Security', count: 28 },
    { id: 'monitoring', name: 'Monitoring', count: 35 },
    { id: 'development', name: 'Development', count: 42 },
    { id: 'networking', name: 'Networking', count: 18 },
    { id: 'storage', name: 'Storage', count: 27 }
  ]

  const extensions = [
    {
      id: 'snyk',
      name: 'Snyk',
      category: 'security',
      description: 'Find and fix vulnerabilities in containers',
      icon: '🛡️',
      downloads: '1.2M',
      rating: 4.8
    },
    {
      id: 'portainer',
      name: 'Portainer',
      category: 'monitoring',
      description: 'Powerful container management UI',
      icon: '📊',
      downloads: '5.3M',
      rating: 4.9
    },
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'development',
      description: 'Develop inside containers with VS Code',
      icon: '💻',
      downloads: '3.7M',
      rating: 4.9
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'development',
      description: 'Deploy to Kubernetes from Docker Desktop',
      icon: '☸️',
      downloads: '2.1M',
      rating: 4.7
    },
    {
      id: 'nginx-proxy',
      name: 'NGINX Proxy Manager',
      category: 'networking',
      description: 'Easy reverse proxy with SSL',
      icon: '🌐',
      downloads: '890K',
      rating: 4.6
    },
    {
      id: 'minio',
      name: 'MinIO',
      category: 'storage',
      description: 'S3-compatible object storage',
      icon: '💾',
      downloads: '1.5M',
      rating: 4.8
    }
  ]

  const filteredExtensions = selectedCategory === 'all' 
    ? extensions 
    : extensions.filter(ext => ext.category === selectedCategory)

  const installExtension = (extensionId: string) => {
    narrate(`Installing ${extensions.find(e => e.id === extensionId)?.name} extension`)
    setInstalledExtensions([...installedExtensions, extensionId])
    
    setTimeout(() => {
      narrate('Extension installed successfully')
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Docker Extensions - Marketplace</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <CanvasParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Extensions</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Extend Docker Desktop with powerful third-party tools and integrations
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  narrate(`Viewing ${category.name}`)
                }}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'glass-card text-gray-300 hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-70">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Extensions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExtensions.map((extension, index) => (
              <div
                key={extension.id}
                className="glass-card p-6 hover-lift"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  opacity: 0
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{extension.icon}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-medium">{extension.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {extension.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  {extension.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">
                    📥 {extension.downloads} downloads
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    {extension.category}
                  </span>
                </div>
                
                <button
                  onClick={() => installExtension(extension.id)}
                  disabled={installedExtensions.includes(extension.id)}
                  className={`w-full py-2 rounded-lg transition-all ${
                    installedExtensions.includes(extension.id)
                      ? 'bg-green-500/20 text-green-400 cursor-default'
                      : 'btn-primary-v2'
                  }`}
                >
                  {installedExtensions.includes(extension.id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓</span> Installed
                    </span>
                  ) : (
                    'Install'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Marketplace Stats */}
          <div className="glass-card p-8 mt-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Extension Marketplace Stats
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-cyan-400">150+</div>
                <p className="text-gray-400">Available Extensions</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">25M+</div>
                <p className="text-gray-400">Total Downloads</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">500+</div>
                <p className="text-gray-400">Active Developers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-400">4.7</div>
                <p className="text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Developer CTA */}
          <div className="glass-card p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Build Your Own Extension
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the Docker Extensions ecosystem. Build powerful integrations that millions of developers can use.
            </p>
            <button className="btn-primary-v2">
              View Developer Docs →
            </button>
          </div>
        </div>
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
      `}</style>
    </>
  )
}