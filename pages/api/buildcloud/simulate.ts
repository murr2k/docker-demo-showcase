import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { useCloud } = req.body

  // Simulate build process
  const buildSteps = [
    'Resolving dependencies...',
    'Building application layers...',
    'Optimizing image size...',
    'Pushing to registry...',
  ]

  // Simulate different build times
  const buildTime = useCloud ? 1500 : 3000 // milliseconds

  // Simulate the build
  await new Promise(resolve => setTimeout(resolve, buildTime))

  const response = {
    success: true,
    message: useCloud 
      ? '✅ Cloud build completed (50% faster!)' 
      : '✅ Local build completed',
    buildTime: buildTime / 1000,
    steps: buildSteps,
    metrics: {
      layers: 12,
      size: '142MB',
      cached: useCloud ? '89%' : '23%',
    }
  }

  res.status(200).json(response)
}