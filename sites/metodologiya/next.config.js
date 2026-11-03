/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/metodologiya",
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optim.tildacdn.com",
      },
      {
        protocol: "https",
        hostname: "static.tildacdn.com",
      },
      {
        protocol: "https",
        hostname: "logo-teka.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "agkedu.getcourse.ru",
      },
    ],
  },
};

module.exports = nextConfig;
