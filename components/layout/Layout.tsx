import React from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="docker-gradient text-white">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Docker Demo Showcase
            </Link>
            <div className="flex space-x-6">
              <Link href="/docker-hub" className="hover:text-gray-200">
                Docker Hub
              </Link>
              <Link href="/build-cloud" className="hover:text-gray-200">
                Build Cloud
              </Link>
              <Link href="/scout" className="hover:text-gray-200">
                Scout
              </Link>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>Built with Docker, Next.js, and deployed on Fly.io</p>
          <p className="text-sm text-gray-400 mt-1">By murr2k</p>
        </div>
      </footer>
    </div>
  )
}