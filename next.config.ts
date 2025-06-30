// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // 1. Exclude .svg from the default file loader
    config.module.rules.forEach((rule: any) => {
      if (
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
      ) {
        rule.exclude = /\.svg$/i;
      }
    });

    // 2. Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
