import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/docx-flow",
  output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
