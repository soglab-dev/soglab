import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/soglab',
  assetPrefix: '/soglab',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
