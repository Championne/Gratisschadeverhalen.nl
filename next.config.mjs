/** @type {import('next').NextConfig} */
const nextConfig = {

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome',
      'framer-motion',
      'date-fns',
    ],
  },

  // Production optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Strict mode for better React practices
  reactStrictMode: true,
}

export default nextConfig
