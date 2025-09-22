import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
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
