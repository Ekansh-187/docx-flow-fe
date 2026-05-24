import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.200"],
  compress: true,
};

export default nextConfig;
