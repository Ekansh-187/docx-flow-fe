import type { NextConfig } from "next";

const apiBaseUrl = process.env.PUBLIC_DOCX_CONVERTOR_API;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.192"],
  compress: true,
  async rewrites() {
    return apiBaseUrl
      ? [
          {
            source: "/api/proxy/:path*",
            destination: `${apiBaseUrl}/:path*`,
          },
        ]
      : [];
  },
};

export default nextConfig;
