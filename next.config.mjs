/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMP: Disable standalone on Windows to avoid EPERM symlink errors
  // The Docker build will use standalone mode on Linux where it works
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  
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
