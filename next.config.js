/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
});

module.exports = withPWA({});

module.exports = nextConfig;
