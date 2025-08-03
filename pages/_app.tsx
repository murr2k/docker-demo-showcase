import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/v2/design-system.css'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isV2Page = router.pathname !== '/docker-hub' && 
                   router.pathname !== '/build-cloud' && 
                   router.pathname !== '/scout' &&
                   router.pathname !== '/index-v1'

  useEffect(() => {
    // Add v2 class to body for new pages
    if (isV2Page) {
      document.body.classList.add('v2-theme')
    } else {
      document.body.classList.remove('v2-theme')
    }
  }, [isV2Page])

  // Don't use layout for v2 pages
  if (isV2Page) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}