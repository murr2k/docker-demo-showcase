import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      title: 'Docker Hub',
      description: 'Explore repository management, image distribution, and automated builds',
      link: '/docker-hub',
      icon: '🐳',
    },
    {
      title: 'Docker Build Cloud',
      description: 'Experience accelerated builds with multi-architecture support',
      link: '/build-cloud',
      icon: '☁️',
    },
    {
      title: 'Docker Scout',
      description: 'Discover real-time vulnerability scanning and SBOM generation',
      link: '/scout',
      icon: '🔍',
    },
  ]

  return (
    <>
      <Head>
        <title>Docker Demo Showcase</title>
        <meta name="description" content="Comprehensive demonstration of Docker features" />
      </Head>

      <div className="max-w-6xl mx-auto">
        <section className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4">
            Docker Features Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore the power of Docker Hub, Build Cloud, and Scout in action
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-12">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.link}>
              <div className="feature-card cursor-pointer hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <span className="text-docker-blue font-medium">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">About This Demo</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This showcase demonstrates real-world integration of Docker&apos;s ecosystem tools.
            Built with Next.js and deployed on Fly.io, it provides interactive examples
            of Docker Hub API integration, Build Cloud acceleration, and Scout vulnerability scanning.
          </p>
        </section>
      </div>
    </>
  )
}