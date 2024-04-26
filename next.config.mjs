/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ['level'],
  },
};

export default nextConfig;
