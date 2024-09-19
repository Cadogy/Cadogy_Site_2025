export type SiteConfig = {
  name: string
  slogan: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  // links: {
  //   github: string
  // }
  ogImage: string
}
