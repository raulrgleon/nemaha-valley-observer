/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "static2.anewspaper.net",
      },
      {
        protocol: "https",
        hostname: "static.anewspaper.net",
      },
      {
        protocol: "https",
        hostname: "www.anewspaper.net",
      },
    ],
  },
};

export default nextConfig;
