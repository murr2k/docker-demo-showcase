/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hub.docker.com', 'docker.com'],
  },
  env: {
    DOCKER_HUB_USERNAME: process.env.DOCKER_HUB_USERNAME || 'murr2k',
    DOCKER_HUB_TOKEN: process.env.DOCKER_HUB_TOKEN,
  },
}

module.exports = nextConfig