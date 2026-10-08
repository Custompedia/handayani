import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export into `out/`, served by Cloudflare Pages.
  output: "export",
  // There's no image optimization server on Pages; the source images are
  // already sized WebP files.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
