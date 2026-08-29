import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Above lib/storage.ts's own 5 Mo cap so oversized uploads are rejected
      // by our validation (clean French error) instead of Next's raw 1 Mo
      // Server Action body limit (uncaught 500).
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
