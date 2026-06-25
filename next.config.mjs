/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fija la raíz del proyecto (evita el warning de "inferred workspace root").
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "d20zx9sjn15rrf.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
