/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`,
  },
};

export default nextConfig;
