import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Several lockfiles exist on this machine; pin the tracing root to this project.
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  // This is an internal design tool; don't let lint block the build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
