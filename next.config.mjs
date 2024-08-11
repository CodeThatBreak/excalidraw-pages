/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "@radix-ui/themes",
      "@excalidraw/excalidraw",
      "usehooks-ts",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
