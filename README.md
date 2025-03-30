# Cadogy Agency - NextJS Fullstack Application
A modern, responsive, and feature-rich web application for Cadogy Agency built with Next.js 14+, TypeScript, and a headless WordPress CMS integration.

<img src="https://i.gyazo.com/c1ebd3d5aef83ff18c3d1d5b7572d826.jpg" width="600px" height="auto" />
<img src="https://i.gyazo.com/14b2f3d6a721678596d0bfa3fb0b53d0.jpg" width="600px" height="auto" />
<img src="https://i.gyazo.com/e0e329302760e8d91425b54bd8a7e923.jpg" width="600px" height="auto" />

## 🚀 Features

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

## 🛠️ Tech Stack

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

## 🏗️ Project Structure

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

## 🚦 Getting Started

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

## 🧪 Development

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

## 🚀 Deployment

This application is designed to be deployed on Vercel or any Next.js-compatible hosting service.

## 📝 License

This software is proprietary and confidential. It is licensed exclusively to Cadogy, LLC. All rights reserved. Unauthorized use, reproduction, or distribution is strictly prohibited. See the [LICENSE](LICENSE) file for more information.
