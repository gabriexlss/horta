import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};
module.exports = {
  allowedDevOrigins: ['192.168.0.102', '10.158.95.134', '192.168.0.103'],
  images: {
    remotePatterns: [new URL(`https://${process.env['R2_PUBLIC_URL']}/**`)]
  }
}

export default nextConfig;
