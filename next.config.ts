import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react'],
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
