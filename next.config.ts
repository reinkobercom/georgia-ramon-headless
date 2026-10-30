export default {
  async redirects() {
    return [
      // Alte Shopify-URLs auf die neuen Seiten
      { source: "/pages/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/products/:handle", destination: "/product/:handle", permanent: true },
      { source: "/collections/all", destination: "/search", permanent: true },
      { source: "/collections/:handle", destination: "/search/:handle", permanent: true },
    ];
  },
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
