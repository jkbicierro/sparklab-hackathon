import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hucsiehmwkqjkfxwxnfn.supabase.co" },
    ],
  },
};

export default nextConfig;
