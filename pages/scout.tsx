import { useState } from 'react'
import Head from 'next/head'

interface Vulnerability {
  id: string
  severity: string
  package: string
  version: string
  fixedVersion?: string
}

export default function Scout() {
  const [image, setImage] = useState('nginx:latest')
  const [scanning, setScanning] = useState(false)
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])

  const scanImage = async () => {
    setScanning(true)
    setVulnerabilities([])
    
    try {
      const response = await fetch('/api/scout/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })
      
      const data = await response.json()
      setVulnerabilities(data.vulnerabilities || [])
    } catch (error) {
      console.error('Scan failed:', error)
    } finally {
      setScanning(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <>
      <Head>
        <title>Docker Scout - Docker Demo</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Docker Scout Vulnerability Scanning</h1>
        
        <div className="feature-card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Image Security Scanner</h2>
          <p className="text-gray-600 mb-4">
            Analyze container images for vulnerabilities and security issues.
          </p>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image name (e.g., nginx:latest)"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              onClick={scanImage}
              disabled={scanning}
              className="btn-primary"
            >
              {scanning ? 'Scanning...' : '🔍 Scan Image'}
            </button>
          </div>

          {vulnerabilities.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Vulnerabilities Found: {vulnerabilities.length}</h3>
              {vulnerabilities.map((vuln) => (
                <div key={vuln.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{vuln.id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p className="text-sm">
                    Package: <span className="font-semibold">{vuln.package}</span> v{vuln.version}
                  </p>
                  {vuln.fixedVersion && (
                    <p className="text-sm text-green-600">
                      Fix available: v{vuln.fixedVersion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="feature-card">
            <h2 className="text-2xl font-semibold mb-4">Scout Features</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✅</span> Real-time CVE detection
              </li>
              <li className="flex items-center">
                <span className="mr-2">✅</span> SBOM generation
              </li>
              <li className="flex items-center">
                <span className="mr-2">✅</span> Policy enforcement
              </li>
              <li className="flex items-center">
                <span className="mr-2">✅</span> EPSS scoring
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <h2 className="text-2xl font-semibold mb-4">Integration Points</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🔗</span> CI/CD pipelines
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔗</span> Docker Desktop
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔗</span> Registry scanning
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔗</span> GitHub Actions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}