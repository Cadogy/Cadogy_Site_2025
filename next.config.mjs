import nextMDX from "@next/mdx"

const withMDX = nextMDX({})

/** @type {import(&apos;next&apos;).NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
}

export default withMDX(nextConfig)
