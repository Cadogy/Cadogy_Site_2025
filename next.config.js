/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Add webpack configuration to exclude node_modules from processing
  webpack: (config, { isServer }) => {
    // Handle HTML files properly
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules/,
      type: "asset/resource",
    })

    // Prevent client-side loading of server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bcrypt: false,
        crypto: false,
        fs: false,
        path: false,
        os: false,
      }
    }

    return config
  },
  // Prevent server-only packages from being bundled on the client
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ]
  },
  // Handle CORS for authentication across domains
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
        has: [
          {
            type: "host",
            value: "(?<host>.*)",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
