import type { WP_Post } from "@/types/wordpress"

export function createMockWPPost(overrides: Partial<WP_Post> = {}): WP_Post {
  return {
    id: 1,
    date: "2024-01-01T00:00:00",
    date_gmt: "2024-01-01T00:00:00",
    guid: { rendered: "https://example.com/post-1" },
    modified: "2024-01-01T00:00:00",
    modified_gmt: "2024-01-01T00:00:00",
    slug: "example-post",
    status: "publish",
    type: "post",
    link: "https://example.com/example-post",
    title: { rendered: "Example Post Title" },
    content: { rendered: "<p>Example content</p>", protected: false },
    excerpt: { rendered: "<p>Example excerpt</p>", protected: false },
    author: 1,
    featured_media: 0,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: [],
    categories: [1],
    tags: [],
    _embedded: {
      author: [
        {
          id: 1,
          name: "Test Author",
          url: "",
          description: "",
          link: "https://example.com/author/test",
          slug: "test-author",
          avatar_urls: {
            24: "https://example.com/avatar-24.jpg",
            48: "https://example.com/avatar-48.jpg",
            96: "https://example.com/avatar-96.jpg",
          },
        },
      ],
      "wp:featuredmedia": [
        {
          id: 1,
          date: "2024-01-01T00:00:00",
          slug: "featured-image",
          type: "attachment",
          link: "https://example.com/featured-image",
          title: { rendered: "Featured Image" },
          author: 1,
          caption: { rendered: "" },
          alt_text: "Featured image alt text",
          media_type: "image",
          mime_type: "image/jpeg",
          media_details: {
            width: 1200,
            height: 800,
            file: "featured-image.jpg",
            sizes: {},
          },
          source_url: "https://example.com/featured-image.jpg",
        },
      ],
    },
    ...overrides,
  } as WP_Post
}

export function createMockWPPosts(count: number): WP_Post[] {
  return Array.from({ length: count }, (_, index) =>
    createMockWPPost({
      id: index + 1,
      slug: `post-${index + 1}`,
      title: { rendered: `Post ${index + 1}` },
    })
  )
}
