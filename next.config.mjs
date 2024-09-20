import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
