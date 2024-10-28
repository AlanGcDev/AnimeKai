/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
