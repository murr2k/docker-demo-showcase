import { useState } from 'react'
import Head from 'next/head'
import ParticleBackground from '../components/v2/ParticleBackground'
import { useNarration } from '../components/v2/AudioSystem'

export default function DockerRegistry() {
  const [activeTab, setActiveTab] = useState('repositories')
  const [selectedRepo, setSelectedRepo] = useState('')
  const { narrate } = useNarration()

  const repositories = [
    {
      name: 'web-app',
      tags: ['latest', 'v2.0.0', 'v1.9.5', 'staging'],
      size: '125 MB',
      pulls: 1842,
      lastUpdated: '2 hours ago',
      visibility: 'private'
    },
    {
      name: 'api-service',
      tags: ['latest', 'production', 'develop'],
      size: '89 MB',
      pulls: 3214,
      lastUpdated: '1 day ago',
      visibility: 'private'
    },
    {
      name: 'ml-model',
      tags: ['latest', 'gpu-optimized', 'cpu-only'],
      size: '2.3 GB',
      pulls: 567,
      lastUpdated: '3 days ago',
      visibility: 'public'
    }
  ]

  const users = [
    { username: 'admin', role: 'Admin', repositories: 'All', lastActive: 'Now' },
    { username: 'developer1', role: 'Developer', repositories: '15', lastActive: '1 hour ago' },
    { username: 'ci-bot', role: 'Service', repositories: 'All', lastActive: '5 minutes ago' }
  ]

  return (
    <>
      <Head>
        <title>Docker Registry - Private Image Management</title>
        <link rel="stylesheet" href="/styles/v2/design-system.css" />
      </Head>

      <ParticleBackground />

      <div className="min-h-screen relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="heading-v2">Docker Registry</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Securely store and distribute Docker images within your organization
          </p>

          {/* Registry Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl font-bold text-cyan-400">24</div>
              <p className="text-gray-400 mt-2">Repositories</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl font-bold text-purple-400">156</div>
              <p className="text-gray-400 mt-2">Total Images</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl font-bold text-green-400">4.2 TB</div>
              <p className="text-gray-400 mt-2">Storage Used</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl font-bold text-orange-400">99.9%</div>
              <p className="text-gray-400 mt-2">Uptime</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setActiveTab('repositories')
                narrate('Viewing repository list')
              }}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'repositories'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              Repositories
            </button>
            <button
              onClick={() => {
                setActiveTab('access')
                narrate('Viewing access control settings')
              }}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'access'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              Access Control
            </button>
            <button
              onClick={() => {
                setActiveTab('webhooks')
                narrate('Viewing webhook configuration')
              }}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'webhooks'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              Webhooks
            </button>
          </div>

          {/* Content Area */}
          <div className="glass-card p-8">
            {activeTab === 'repositories' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Image Repositories</h2>
                  <button className="btn-primary-v2">
                    + Create Repository
                  </button>
                </div>

                <div className="space-y-4">
                  {repositories.map((repo, index) => (
                    <div
                      key={repo.name}
                      className={`glass-card p-6 cursor-pointer transition-all ${
                        selectedRepo === repo.name ? 'ring-2 ring-cyan-500' : ''
                      }`}
                      onClick={() => setSelectedRepo(repo.name)}
                      style={{
                        animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`,
                        opacity: 0
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">
                              registry.example.com/{repo.name}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              repo.visibility === 'private'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {repo.visibility}
                            </span>
                          </div>
                          
                          <div className="flex gap-6 text-sm text-gray-400">
                            <span>Size: {repo.size}</span>
                            <span>Pulls: {repo.pulls.toLocaleString()}</span>
                            <span>Updated: {repo.lastUpdated}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-2">Available Tags</p>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {repo.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded bg-gray-700 text-cyan-400"
                              >
                                {tag}
                              </span>
                            ))}
                            {repo.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{repo.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'access' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">User Access Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-3 text-gray-400">Username</th>
                        <th className="pb-3 text-gray-400">Role</th>
                        <th className="pb-3 text-gray-400">Repository Access</th>
                        <th className="pb-3 text-gray-400">Last Active</th>
                        <th className="pb-3 text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.username} className="border-b border-gray-800">
                          <td className="py-4 text-white">{user.username}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.role === 'Admin'
                                ? 'bg-purple-500/20 text-purple-400'
                                : user.role === 'Service'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 text-gray-300">{user.repositories}</td>
                          <td className="py-4 text-gray-400">{user.lastActive}</td>
                          <td className="py-4">
                            <button className="text-cyan-400 hover:text-cyan-300">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button className="btn-primary-v2 mt-6">
                  + Add User
                </button>
              </div>
            )}

            {activeTab === 'webhooks' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Webhook Configuration</h2>
                
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Push Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">CI/CD Pipeline Trigger</span>
                      <span className="text-green-400">● Active</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      https://ci.example.com/webhook/docker-registry
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Security Scanning</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Vulnerability Scanner</span>
                      <span className="text-green-400">● Active</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      https://security.example.com/scan/new-image
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary-v2 mt-6">
                  + Add Webhook
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure by Default</h3>
              <p className="text-gray-300">TLS encryption and token-based authentication</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-white mb-2">Automated Cleanup</h3>
              <p className="text-gray-300">Garbage collection for unused layers</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Usage Analytics</h3>
              <p className="text-gray-300">Track pulls, pushes, and storage metrics</p>
            </div>
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
      `}</style>
    </>
  )
}