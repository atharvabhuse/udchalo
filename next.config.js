const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  publicRuntimeConfig: {
    apiServerUrl: 'https://dev-server-proxy-preprod.udchalo.com/server/api',
  },
  env: {
    apiServerUrl: 'https://dev-server-proxy-preprod.udchalo.com/server/api',
  },
  images: {
    domains: ['static.udchalo.com'],
    unoptimized: true,
  },
  transpilePackages: ['crypto-js'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/libs/shared/ui/styles')],
    prependData: `@import "src/libs/shared/ui/styles/partials/_variables.scss";
    @import "src/libs/shared/ui/styles/partials/_mixins.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer({ ...nextConfig });
