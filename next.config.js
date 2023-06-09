const withPWA = require("@imbios/next-pwa")({
  dest: "public",
});

/** @type {import("next").NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});

// const runtimeCaching = require("@imbios/next-pwa/cache");

// const withPWA = require("@imbios/next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
//   disable: false,
// });

// /** @type {import("next").NextConfig} */
// module.exports = withPWA({
//   reactStrictMode: true,
//   experimental: {
//     appDir: true,
//   },
// });

// // module.exports = withPWA(nextConfig);
