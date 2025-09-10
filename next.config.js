/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are now stable in Next.js 14+, no need for experimental flag
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

