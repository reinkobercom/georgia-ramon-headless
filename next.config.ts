export default {
  // Testphase: Suchmaschinen fernhalten (vor dem Livegang entfernen)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      // Alte Shopify-URLs auf die neuen Seiten
      { source: "/pages/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/products/:handle", destination: "/product/:handle", permanent: true },
      { source: "/collections/all", destination: "/search", permanent: true },
      { source: "/collections/:handle", destination: "/search/:handle", permanent: true },
      { source: "/blogs/:blog", destination: "/blog", permanent: true },
      { source: "/blogs/:blog/:article", destination: "/blog/:article", permanent: true },
      { source: "/pages/haendlerzugang", destination: "/haendler", permanent: true },
    ];
  },
  experimental: {
    ppr: true,
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
