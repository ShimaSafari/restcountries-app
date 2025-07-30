import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "flagcdn.com", "upload.wikimedia.org"],
  },
};

export default nextConfig;
