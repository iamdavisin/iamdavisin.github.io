import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // GitHub Pages solo sirve ficheros estáticos
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
