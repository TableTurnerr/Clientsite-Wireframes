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
  // The MCP SDK + handler are CJS with dynamic requires (redis adapter). Bundling
  // them produces "Cannot find module './NNN.js'" at prerender time. Marking
  // them external makes Next require() them at runtime instead.
  serverExternalPackages: ["mcp-handler", "@modelcontextprotocol/sdk", "redis"],
};

export default nextConfig;
