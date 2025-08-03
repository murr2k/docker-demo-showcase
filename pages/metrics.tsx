import { useState, useEffect } from 'react'
import Head from 'next/head'
import ParticleBackground from '../components/v2/ParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

export default function DockerMetrics() {
  const { narrate } = useNarration()
  const [timeRange, setTimeRange] = useState('1h')
  const [selectedMetric, setSelectedMetric] = useState('cpu')
  
  // Simulated metrics data
  const [metrics, setMetrics] = useState({
    cpu: Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 40 + Math.random() * 30 + Math.sin(i / 3) * 10
    })),
    memory: Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 60 + Math.random() * 20 + Math.cos(i / 4) * 10
    })),
    network: Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 20 + Math.random() * 40 + Math.sin(i / 2) * 15
    })),
    disk: Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 30 + Math.random() * 25 + Math.cos(i / 3) * 8
    }))
  })

  const [containers, setContainers] = useState([
    { name: 'web-frontend', cpu: 45, memory: 512, status: 'healthy' },
    { name: 'api-backend', cpu: 62, memory: 768, status: 'healthy' },
    { name: 'postgres-db', cpu: 28, memory: 1024, status: 'healthy' },
    { name: 'redis-cache', cpu: 15, memory: 256, status: 'warning' },
    { name: 'nginx-proxy', cpu: 12, memory: 128, status: 'healthy' }
  ])

  // Update metrics in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = { ...prev }
        Object.keys(newMetrics).forEach(key => {
          const data = newMetrics[key as keyof typeof newMetrics]
          data.shift()
          data.push({
            time: data[data.length - 1].time + 1,
            value: Math.max(0, Math.min(100, 
              data[data.length - 1].value + (Math.random() - 0.5) * 20
            ))
          })
        })
        return newMetrics
      })

      setContainers(prev => prev.map(container => ({
        ...container,
        cpu: Math.max(5, Math.min(95, container.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(64, Math.min(2048, container.memory + (Math.random() - 0.5) * 100))
      })))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getMaxValue = (data: typeof metrics.cpu) => 
    Math.max(...data.map(d => d.value))

  const renderChart = (data: typeof metrics.cpu, color: string) => {
    const maxValue = getMaxValue(data)
    const width = 100
    const height = 40
    
    const points = data.map((d, i) => 
      `${(i / (data.length - 1)) * width},${height - (d.value / maxValue) * height}`
    ).join(' ')

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="animate-draw"
        />
        
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#gradient-${color})`}
          className="animate-fade-in"
        />
      </svg>
    )
  }

  return (
    <>
      <Head>
        <title>Docker Metrics - Real-time Monitoring</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <ParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Metrics</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Real-time monitoring and visualization of Docker container performance
          </p>

          {/* Time Range Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {['15m', '1h', '6h', '24h'].map(range => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range)
                  narrate(`Viewing metrics for the last ${range}`)
                }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'glass-card text-gray-300 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Main Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* CPU Usage */}
            <div 
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedMetric === 'cpu' ? 'ring-2 ring-cyan-500' : ''
              }`}
              onClick={() => setSelectedMetric('cpu')}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">CPU Usage</h3>
                  <p className="text-3xl font-bold text-cyan-400">
                    {metrics.cpu[metrics.cpu.length - 1].value.toFixed(1)}%
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
              {renderChart(metrics.cpu, '#00d9ff')}
            </div>

            {/* Memory Usage */}
            <div 
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedMetric === 'memory' ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedMetric('memory')}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Memory Usage</h3>
                  <p className="text-3xl font-bold text-purple-400">
                    {metrics.memory[metrics.memory.length - 1].value.toFixed(1)}%
                  </p>
                </div>
                <div className="text-4xl">🧠</div>
              </div>
              {renderChart(metrics.memory, '#7c3aed')}
            </div>

            {/* Network I/O */}
            <div 
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedMetric === 'network' ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedMetric('network')}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Network I/O</h3>
                  <p className="text-3xl font-bold text-green-400">
                    {metrics.network[metrics.network.length - 1].value.toFixed(1)} MB/s
                  </p>
                </div>
                <div className="text-4xl">🌐</div>
              </div>
              {renderChart(metrics.network, '#10b981')}
            </div>

            {/* Disk Usage */}
            <div 
              className={`glass-card p-6 cursor-pointer transition-all ${
                selectedMetric === 'disk' ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => setSelectedMetric('disk')}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Disk Usage</h3>
                  <p className="text-3xl font-bold text-orange-400">
                    {metrics.disk[metrics.disk.length - 1].value.toFixed(1)}%
                  </p>
                </div>
                <div className="text-4xl">💾</div>
              </div>
              {renderChart(metrics.disk, '#f97316')}
            </div>
          </div>

          {/* Container Status */}
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Container Status</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="pb-3 text-gray-400">Container</th>
                    <th className="pb-3 text-gray-400">CPU</th>
                    <th className="pb-3 text-gray-400">Memory</th>
                    <th className="pb-3 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container, index) => (
                    <tr 
                      key={container.name}
                      className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                      style={{
                        animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <td className="py-4 text-white font-medium">{container.name}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                container.cpu > 70 ? 'bg-red-500' : 
                                container.cpu > 50 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${container.cpu}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">{container.cpu}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-300">{container.memory} MB</span>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          container.status === 'healthy' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            container.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          {container.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grafana Integration Note */}
          <div className="glass-card p-6 mt-8 text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Grafana Integration</h3>
            <p className="text-gray-300">
              This demo simulates Grafana-style metrics. In production, connect to Prometheus + Grafana 
              for comprehensive Docker monitoring with custom dashboards and alerts.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes draw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-draw {
          animation: draw 1.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out 0.5s both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}