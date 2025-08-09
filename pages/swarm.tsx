import { useState, useEffect } from 'react'
import Head from 'next/head'
import CanvasParticleBackground from '../components/v2/CanvasParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

interface Node {
  id: string
  name: string
  role: 'manager' | 'worker'
  status: 'ready' | 'down' | 'draining'
  cpu: number
  memory: number
  containers: number
}

interface Service {
  id: string
  name: string
  replicas: number
  image: string
  nodes: string[]
}

export default function DockerSwarm() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', name: 'manager-1', role: 'manager', status: 'ready', cpu: 45, memory: 60, containers: 3 },
    { id: '2', name: 'worker-1', role: 'worker', status: 'ready', cpu: 30, memory: 40, containers: 2 },
    { id: '3', name: 'worker-2', role: 'worker', status: 'ready', cpu: 55, memory: 70, containers: 4 }
  ])
  
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'web-app', replicas: 3, image: 'nginx:alpine', nodes: ['1', '2', '3'] },
    { id: '2', name: 'api-service', replicas: 2, image: 'node:18', nodes: ['2', '3'] }
  ])
  
  const [selectedService, setSelectedService] = useState<string>('')
  const [isScaling, setIsScaling] = useState(false)
  const { narrate } = useNarration()

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          cpu: Math.max(10, Math.min(90, node.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(20, Math.min(90, node.memory + (Math.random() - 0.5) * 8))
        }))
      )
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const addNode = () => {
    narrate('Adding a new worker node to the swarm cluster')
    const newNode: Node = {
      id: String(nodes.length + 1),
      name: `worker-${nodes.filter(n => n.role === 'worker').length + 1}`,
      role: 'worker',
      status: 'ready',
      cpu: 20,
      memory: 30,
      containers: 0
    }
    setNodes([...nodes, newNode])
  }

  const scaleService = (serviceId: string, delta: number) => {
    narrate(`Scaling service ${delta > 0 ? 'up' : 'down'}`)
    setIsScaling(true)
    
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const newReplicas = Math.max(1, service.replicas + delta)
        return { ...service, replicas: newReplicas }
      }
      return service
    }))
    
    setTimeout(() => setIsScaling(false), 1000)
  }

  return (
    <>
      <Head>
        <title>Docker Swarm - Cluster Visualization</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <CanvasParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Swarm</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Orchestrate and manage containerized applications across a cluster of Docker nodes
          </p>

          {/* Cluster Overview */}
          <div className="glass-card p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Cluster Overview</h2>
              <button
                onClick={addNode}
                className="btn-primary-v2"
              >
                + Add Node
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {nodes.map((node, index) => (
                <div
                  key={node.id}
                  className={`glass-card p-6 ${
                    node.role === 'manager' ? 'border-2 border-purple-500' : ''
                  } hover-lift`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{node.name}</h3>
                      <span className={`text-sm ${
                        node.role === 'manager' ? 'text-purple-400' : 'text-cyan-400'
                      }`}>
                        {node.role.toUpperCase()}
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      node.status === 'ready' ? 'bg-green-500' : 'bg-red-500'
                    } pulse`} />
                  </div>

                  {/* Resource Meters */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">CPU</span>
                        <span className="text-white">{node.cpu.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                          style={{ width: `${node.cpu}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white">{node.memory.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                          style={{ width: `${node.memory}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-2xl">{node.containers}</span>
                    <p className="text-sm text-gray-400">Containers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Deployed Services</h2>
            
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`glass-card p-6 cursor-pointer transition-all ${
                    selectedService === service.id ? 'border-2 border-cyan-500' : ''
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.image}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">
                          {service.replicas}
                        </div>
                        <p className="text-sm text-gray-400">Replicas</p>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            scaleService(service.id, 1)
                          }}
                          disabled={isScaling}
                          className="btn-v2 glass-card px-3 py-1 text-sm hover:bg-green-500/20"
                        >
                          ▲
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            scaleService(service.id, -1)
                          }}
                          disabled={isScaling || service.replicas <= 1}
                          className="btn-v2 glass-card px-3 py-1 text-sm hover:bg-red-500/20"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Replica Distribution */}
                  <div className="mt-4 flex gap-2">
                    {Array.from({ length: service.replicas }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-xs text-cyan-400 float-animation"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-3">🐝</div>
              <h3 className="text-lg font-semibold text-white mb-2">Auto-Scaling</h3>
              <p className="text-sm text-gray-300">Scale services up or down based on demand</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-white mb-2">Load Balancing</h3>
              <p className="text-sm text-gray-300">Distribute traffic across healthy containers</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Self-Healing</h3>
              <p className="text-sm text-gray-300">Automatically recover from node failures</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure by Default</h3>
              <p className="text-sm text-gray-300">TLS encryption between all nodes</p>
            </div>
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