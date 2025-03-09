import path from 'path'
import { NextConfig } from 'next'

import { config } from 'dotenv'
import { RemotePattern } from 'next/dist/shared/lib/image-config'

config({ path: path.resolve(process.cwd(), '../../.env') })

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
