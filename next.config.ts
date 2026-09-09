import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cheranetwork-new",
  assetPrefix: "/cheranetwork-new/",
  images: { unoptimized: true },
};

export default nextConfig;
