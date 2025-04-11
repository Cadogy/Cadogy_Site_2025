# Cadogy Agency

<div align="center">
  <img src="/public/images/cadogy_agency_github_demo.jpg" alt="Cadogy Agency Demo" />
  <p>Developed by <a href="https://www.cadogy.com">Cadogy</a></p>
</div>

## About Cadogy Agency

A modern, responsive, and feature-rich web application for Cadogy Agency built with Next.js 14+, TypeScript, and a headless WordPress CMS integration.

## Features

- **Modern Frontend Stack**: Next.js 14+ with App Router, React 18, TypeScript, and TailwindCSS
- **UI Components**: Rich component library using shadcn/ui (built on Radix UI primitives)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Theme switching with system preference detection
- **CMS Integration**: Headless WordPress API for content management
- **Authentication**: User registration, login, and profile management
- **Articles System**: Blog posts with categories, tags, and search functionality
- **Interactive UI**: Carousels, animations, and micro-interactions using Framer Motion
- **Accessibility**: ARIA compliant components with keyboard navigation support
- **Three.js Integration**: 3D rendering capabilities with React Three Fiber

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with class-variance-authority
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **CMS**: Headless WordPress API
- **Animation**: Framer Motion
- **3D Rendering**: Three.js with React Three Fiber
- **API Integration**: Axios

## Project Structure

```
├── src/
│   ├── app/               # Next.js application routes (App Router)
│   │   ├── (auth)/        # Authentication-related routes
│   │   └── (default)/     # Main application routes
│   ├── components/        # Reusable UI components
│   │   ├── body/          # Page-specific components
│   │   ├── elements/      # Reusable UI elements
│   │   ├── home/          # Homepage-specific components
│   │   ├── mdx/           # MDX rendering components
│   │   └── ui/            # shadcn/ui components
│   ├── config/            # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   │   └── wordpress-api.ts  # WordPress API integration
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── content/               # MDX content files
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/cadogy-fs.git
cd cadogy-fs
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production-ready application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### WordPress Integration

The application integrates with a headless WordPress instance for content management. Key features include:

- Article/blog post retrieval with categories and tags
- Media handling with optimized image loading
- Content formatting and HTML entity decoding
- Cache-busting for WordPress images

## Deployment

This application is designed to be deployed on Vercel or any Next.js-compatible hosting service.

## License

MIT License

Copyright (c) 2025 Cadogy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
