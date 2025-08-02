/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['hub.docker.com', 'docker.com'],
  },
  env: {
    DOCKER_HUB_USERNAME: process.env.DOCKER_HUB_USERNAME || 'murr2k',
    DOCKER_HUB_TOKEN: process.env.DOCKER_HUB_TOKEN,
    FLY_REGION: process.env.FLY_REGION || 'local',
  },
}

module.exports = nextConfig