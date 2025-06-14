/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/homepage',
        permanent: false, // để tránh cache khi dev
      },
    ];
  },
};

module.exports = nextConfig;
