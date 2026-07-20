import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false, // 307 redirect
      },
    ];
  },
};

export default nextConfig;
