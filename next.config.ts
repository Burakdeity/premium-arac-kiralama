import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";

const adminProxyPrefixes = [
  "admin",
  "livewire",
  "filament",
  "storage",
  "css/filament",
  "js/filament",
  "vendor/livewire",
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return adminProxyPrefixes.flatMap((prefix) => [
      {
        source: `/${prefix}`,
        destination: `${backendUrl}/${prefix}`,
      },
      {
        source: `/${prefix}/:path*`,
        destination: `${backendUrl}/${prefix}/:path*`,
      },
    ]);
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.premiumarackiralama.com",
      },
      {
        protocol: "https",
        hostname: "sakaryarkrentacar.com",
      },
      {
        protocol: "https",
        hostname: "www.sakaryarkrentacar.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);
