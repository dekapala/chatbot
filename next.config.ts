import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cloudflare Worker / OpenNext Deployment Config */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
