/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker builds (Linux)
  // Disabled on Windows to avoid EPERM symlink errors
  output: process.platform === 'linux' || process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
}

export default nextConfig
