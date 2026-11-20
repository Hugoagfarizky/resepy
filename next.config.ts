import type { NextConfig } from "next";

// GitHub Pages menyajikan project site di /<repo>/, jadi build produksi
// memakai basePath. Saat `npm run dev` nilainya kosong.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: hasil build ada di out/ dan bisa dilayani hosting statis.
  output: "export",
  basePath,
  // Menghasilkan /recipes/<slug>/index.html supaya cocok dengan GitHub Pages.
  trailingSlash: true,
  images: {
    // next/image tidak punya server optimizer di static export.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
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
