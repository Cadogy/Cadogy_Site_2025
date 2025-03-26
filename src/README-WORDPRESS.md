# WordPress Integration for Cadogy

This document explains how the WordPress headless CMS has been integrated with this Next.js application.

## Overview

The blog section of the Cadogy website has been migrated from MDX files to a headless WordPress setup. WordPress serves as the content management system, while the Next.js front-end fetches and displays the content using the WordPress REST API.

## WordPress Setup

The WordPress instance is running at https://wp.cadogy.com/ and is configured as a headless CMS (providing content through its REST API).

## API Integration

The WordPress API integration is handled through the following files:

- `src/lib/wordpress-api.ts` - Contains all the functions for fetching and processing WordPress data
- `src/types/wordpress.ts` - TypeScript definitions for WordPress API response objects

## Key Components

1. **Article List Page**: `src/app/(default)/articles/page.tsx`

   - Fetches and displays a list of all published articles
   - Uses the `ArticlesHero` component to showcase featured articles

2. **Single Article Page**: `src/app/(default)/articles/[slug]/page.tsx`

   - Dynamic route for individual articles
   - Fetches article content by slug
   - Displays article content, meta data, categories, and tags

3. **Category Pages**: `src/app/(default)/articles/category/[slug]/page.tsx`

   - Displays articles filtered by category

4. **Tag Pages**: `src/app/(default)/articles/tag/[slug]/page.tsx`

   - Displays articles filtered by tag

5. **Components**:
   - `ArticlesHero`: Featured article display on the main articles page
   - `ArticlesGrid`: Grid layout for displaying multiple articles on category and tag pages
   - `ArticleCore`: Core display component for individual article pages

## Styling

WordPress content is styled with custom CSS in `src/styles/wp-content.css`, which is imported into the global CSS file.

## SEO

Each page exports proper Next.js metadata objects for SEO optimization, including:

- Title and description
- Open Graph tags
- Twitter card information
- Keywords

## Data Flow

1. Content is created and edited in WordPress
2. Next.js fetches content from WordPress REST API
3. Content is rendered with custom styling and components

## Development

When developing new features for the blog:

1. Add content in WordPress admin
2. Use the WordPress REST API Inspector to understand data structure if needed
3. Update components as necessary

## Extending

To add new blog features:

1. Add custom fields in WordPress if needed
2. Update the TypeScript types in `src/types/wordpress.ts`
3. Add new API functions in `src/lib/wordpress-api.ts`
4. Create or update components to use the new data

## Caching

API responses are cached for 1 hour using Next.js's built-in cache system for improved performance.
