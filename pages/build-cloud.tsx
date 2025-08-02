import { useState } from 'react'
import Head from 'next/head'

export default function BuildCloud() {
  const [buildStatus, setBuildStatus] = useState<string>('')
  const [buildTime, setBuildTime] = useState<number>(0)

  const simulateBuild = async (useCloud: boolean) => {
    setBuildStatus('Building...')
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/buildcloud/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useCloud }),
      })
      
      const data = await response.json()
      const endTime = Date.now()
      setBuildTime((endTime - startTime) / 1000)
      setBuildStatus(data.message)
    } catch (error) {
      setBuildStatus('Build failed')
    }
  }

  return (
    <>
      <Head>
        <title>Docker Build Cloud - Docker Demo</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Docker Build Cloud</h1>
        
        <div className="feature-card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Build Performance Comparison</h2>
          <p className="text-gray-600 mb-6">
            Experience the speed difference between local builds and Docker Build Cloud.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => simulateBuild(false)}
              className="btn-primary py-4"
            >
              🖥️ Local Build
            </button>
            <button
              onClick={() => simulateBuild(true)}
              className="btn-primary py-4 bg-green-600 hover:bg-green-700"
            >
              ☁️ Cloud Build
            </button>
          </div>

          {buildStatus && (
            <div className="bg-gray-100 rounded-md p-4">
              <p className="font-semibold">{buildStatus}</p>
              {buildTime > 0 && (
                <p className="text-sm text-gray-600">Build time: {buildTime}s</p>
              )}
            </div>
          )}
        </div>

        <div className="feature-card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Multi-Architecture Support</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">AMD64</h3>
              <p className="text-sm">Native performance for x86_64 architecture</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">ARM64</h3>
              <p className="text-sm">Optimized builds for ARM processors</p>
            </div>
          </div>
        </div>

        <div className="feature-card">
          <h2 className="text-2xl font-semibold mb-4">Build Cloud Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-2xl mr-3">⚡</span>
              <div>
                <h4 className="font-semibold">50% Faster Builds</h4>
                <p className="text-sm text-gray-600">Cloud infrastructure optimized for Docker builds</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🔄</span>
              <div>
                <h4 className="font-semibold">Shared Cache</h4>
                <p className="text-sm text-gray-600">Team-wide cache sharing for maximum efficiency</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <h4 className="font-semibold">Build Analytics</h4>
                <p className="text-sm text-gray-600">Detailed insights into build performance</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}