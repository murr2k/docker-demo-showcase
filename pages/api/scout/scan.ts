import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { image } = req.body

  if (!image) {
    return res.status(400).json({ error: 'Image name is required' })
  }

  // Simulate vulnerability scanning
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock vulnerability data
  const vulnerabilities = [
    {
      id: 'CVE-2023-45853',
      severity: 'CRITICAL',
      package: 'zlib',
      version: '1.2.11',
      fixedVersion: '1.2.13',
    },
    {
      id: 'CVE-2023-38545',
      severity: 'HIGH',
      package: 'curl',
      version: '7.88.1',
      fixedVersion: '8.4.0',
    },
    {
      id: 'CVE-2023-44487',
      severity: 'MEDIUM',
      package: 'nghttp2',
      version: '1.51.0',
      fixedVersion: '1.57.0',
    },
    {
      id: 'CVE-2023-36617',
      severity: 'LOW',
      package: 'openssl',
      version: '3.0.8',
      fixedVersion: '3.0.11',
    },
  ]

  const response = {
    image,
    scanDate: new Date().toISOString(),
    vulnerabilities: image.includes('alpine') 
      ? vulnerabilities.slice(2) // Alpine has fewer vulnerabilities
      : vulnerabilities,
    summary: {
      critical: vulnerabilities.filter(v => v.severity === 'CRITICAL').length,
      high: vulnerabilities.filter(v => v.severity === 'HIGH').length,
      medium: vulnerabilities.filter(v => v.severity === 'MEDIUM').length,
      low: vulnerabilities.filter(v => v.severity === 'LOW').length,
    },
    sbom: {
      packages: 127,
      layers: 8,
    },
  }

  res.status(200).json(response)
}