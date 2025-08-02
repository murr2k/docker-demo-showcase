import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    // Docker Hub API v2
    const response = await fetch(
      `https://hub.docker.com/v2/namespaces/${username}/repositories/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Docker Hub API error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch repositories',
      // Fallback demo data
      results: [
        {
          name: 'demo-app',
          namespace: username,
          description: 'A sample Docker application',
          star_count: 42,
          pull_count: 1337,
        },
        {
          name: 'nginx-custom',
          namespace: username,
          description: 'Custom NGINX configuration',
          star_count: 15,
          pull_count: 523,
        },
      ]
    })
  }
}