/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          ws: false,
          'utf-8-validate': false,
          bufferutil: false,
          encoding: false
        }
      };
    }
    return config;
  },
  experimental: {
    serverActions: {
      enabled: true
    }
  }
}

module.exports = nextConfig;

