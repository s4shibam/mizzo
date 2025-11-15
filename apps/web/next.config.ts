import { NextConfig } from 'next'

import { RemotePattern } from 'next/dist/shared/lib/image-config'

const allowedImageDomains: RemotePattern[] = [
  {
    protocol: 'https',
    hostname: '**'
  }
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: allowedImageDomains
  },
  reactStrictMode: false
}

export default nextConfig
