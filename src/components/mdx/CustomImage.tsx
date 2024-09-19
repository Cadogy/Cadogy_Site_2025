// components/mdx/CustomImage.tsx
import { DetailedHTMLProps, ImgHTMLAttributes } from "react"
import Image from "next/image"

// Extend the standard img props to allow it to be used like an HTML img tag
type CustomImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  ...props
}: CustomImageProps) {
  // If width and height are provided, use Next.js Image component, otherwise fall back to standard img
  if (width && height) {
    return (
      <Image src={src} alt={alt} width={width} height={height} {...props} />
    )
  }

  // Fallback to native img element if width and height are not provided
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />
}
