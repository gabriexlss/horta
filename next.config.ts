import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    '192.168.3.32',
    '192.168.0.102',
    '10.158.95.134',
    'localhost:3000',
    '192.168.0.103'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagens-horta.gabriexlss.com',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
