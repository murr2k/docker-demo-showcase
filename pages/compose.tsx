import { useState } from 'react'
import Head from 'next/head'
import ParticleBackground from '../components/v2/ParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

export default function DockerCompose() {
  const [yamlContent, setYamlContent] = useState(`version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - api
    
  api:
    build: ./api
    environment:
      - DB_HOST=postgres
    depends_on:
      - postgres
    
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`)

  const [services, setServices] = useState<any[]>([])
  const [isDeploying, setIsDeploying] = useState(false)
  const { narrate } = useNarration()

  const parseCompose = () => {
    narrate('Parsing Docker Compose configuration. This YAML file defines a multi-container application with web, API, and database services.')
    
    // Simulate parsing
    const mockServices = [
      { 
        name: 'web', 
        image: 'nginx:alpine', 
        status: 'ready', 
        ports: ['80:80'],
        depends: ['api']
      },
      { 
        name: 'api', 
        image: 'custom-build', 
        status: 'building',
        depends: ['postgres']
      },
      { 
        name: 'postgres', 
        image: 'postgres:15', 
        status: 'ready',
        volumes: ['db-data']
      }
    ]
    
    setServices(mockServices)
    setIsDeploying(true)
    
    // Simulate deployment
    setTimeout(() => {
      setServices(mockServices.map(s => ({ ...s, status: 'running' })))
      setIsDeploying(false)
      narrate('All services are now running. The application stack is fully deployed.')
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Docker Compose - Interactive Playground</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <ParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Compose</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Define and run multi-container Docker applications with a single YAML file
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* YAML Editor */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Compose Configuration</h2>
              
              <div className="relative">
                <textarea
                  value={yamlContent}
                  onChange={(e) => setYamlContent(e.target.value)}
                  className="w-full h-96 p-4 bg-black/50 text-green-400 font-mono text-sm rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none resize-none"
                  spellCheck={false}
                />
                
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="text-gray-400 hover:text-white text-sm">
                    📋 Copy
                  </button>
                  <button className="text-gray-400 hover:text-white text-sm">
                    💾 Save
                  </button>
                </div>
              </div>
              
              <button
                onClick={parseCompose}
                disabled={isDeploying}
                className="btn-primary-v2 w-full mt-4"
              >
                {isDeploying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader-docker w-5 h-5" />
                    Deploying Stack...
                  </span>
                ) : (
                  'Deploy Stack'
                )}
              </button>
            </div>

            {/* Service Visualization */}
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Service Architecture</h2>
              
              <div className="relative h-96 overflow-hidden">
                {services.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎼</div>
                      <p>Deploy your compose file to see the service architecture</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {services.map((service, index) => (
                      <div
                        key={service.name}
                        className={`glass-card p-4 transform transition-all duration-500 ${
                          service.status === 'running' ? 'scale-100' : 'scale-95'
                        }`}
                        style={{
                          animationDelay: `${index * 0.2}s`,
                          animation: 'fadeInLeft 0.6s ease-out forwards'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-400">{service.image}</p>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            service.status === 'running' 
                              ? 'bg-green-500/20 text-green-400'
                              : service.status === 'building'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {service.status}
                          </div>
                        </div>
                        
                        {service.ports && (
                          <div className="mt-2 text-sm text-cyan-400">
                            Ports: {service.ports.join(', ')}
                          </div>
                        )}
                        
                        {service.depends && (
                          <div className="mt-2 text-sm text-purple-400">
                            Depends on: {service.depends.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-white mb-2">Service Linking</h3>
              <p className="text-gray-300">Automatically link services and manage dependencies</p>
            </div>
            
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-2">One Command</h3>
              <p className="text-gray-300">Start your entire stack with docker-compose up</p>
            </div>
            
            <div className="glass-card p-6 hover-lift">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-2">Volume Management</h3>
              <p className="text-gray-300">Persist data across container restarts</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}