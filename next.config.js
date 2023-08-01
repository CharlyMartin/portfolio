/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function webpackConfig(config, webpackConfig) {
    const { isServer } = webpackConfig;
    if (isServer) {
      require("./scripts/generate-sitemap.js");
    }

    return config;
  },
};

module.exports = nextConfig;
