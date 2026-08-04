import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for Cloudflare Workers assets-only deployment */
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
