import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  distDir: "build",
  //output: "export",
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
