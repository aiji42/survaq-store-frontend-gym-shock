var RouteHas = require("next/dist/lib/load-custom-routes").RouteHas;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  redirects: () => [{
    source: '/products/:path*',
    destination: '/',
    statusCode: 301
  }]
};

module.exports = nextConfig;
