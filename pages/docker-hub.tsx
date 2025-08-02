import { useState } from 'react'
import Head from 'next/head'

export default function DockerHub() {
  const [username, setUsername] = useState('murr2k')
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/dockerhub/repos?username=${username}`)
      const data = await response.json()
      setRepos(data.results || [])
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Docker Hub Integration - Docker Demo</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Docker Hub Integration</h1>
        
        <div className="feature-card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Repository Explorer</h2>
          <p className="text-gray-600 mb-4">
            Explore Docker Hub repositories and their details using the Docker Hub API.
          </p>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Docker Hub username"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              onClick={fetchRepositories}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Loading...' : 'Fetch Repositories'}
            </button>
          </div>

          {repos.length > 0 && (
            <div className="space-y-4">
              {repos.map((repo) => (
                <div key={repo.name} className="border rounded-md p-4">
                  <h3 className="font-semibold">{repo.namespace}/{repo.name}</h3>
                  <p className="text-sm text-gray-600">{repo.description || 'No description'}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>⭐ {repo.star_count}</span>
                    <span>📥 {repo.pull_count} pulls</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="feature-card">
          <h2 className="text-2xl font-semibold mb-4">Features Demonstrated</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Docker Hub API v2 integration</li>
            <li>Repository listing and metadata</li>
            <li>Pull and star statistics</li>
            <li>Real-time API interaction</li>
          </ul>
        </div>
      </div>
    </>
  )
}