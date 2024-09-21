import nextMDX from "@next/mdx"

const withMDX = nextMDX({})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
}

export default withMDX(nextConfig)
