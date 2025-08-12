import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.transom-dev.ru",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
