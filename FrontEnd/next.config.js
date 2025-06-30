/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/homepage',
        permanent: false, // tránh cache khi dev
      },
    ];
  },
};

module.exports = nextConfig;
