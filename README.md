# Cadogy Agency

<div align="center">
  <img src="/public/images/cadogy_agency_frontend.jpg" alt="Cadogy Agency Frontend" />
  <img src="/public/images/cadogy_agency_dashboard.png" alt="Cadogy Agency Backend" />
  <img src="/public/images/cadogy_agency_email.png" alt="Cadogy Agency Emails" />
  <p>Developed by <a href="https://www.cadogy.com">Cadogy</a></p>
</div>

## About Cadogy Agency

A modern, responsive, and feature-rich web application for Cadogy Agency built with Next.js 14+, TypeScript, and a headless WordPress CMS integration. The platform includes comprehensive user authentication, email verification, API management, and a rich interactive UI experience.

## Features

- **Modern Frontend Stack**: Next.js 14+ with App Router, React 18, TypeScript, and TailwindCSS
- **UI Components**: Rich component library using shadcn/ui (built on Radix UI primitives)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Theme switching with system preference detection
- **CMS Integration**: Headless WordPress API for content management
- **Authentication**: Complete user registration, login, email verification, and profile management
- **Email System**: Professional email templates with responsive design and dark mode styling
- **Toast Notifications**: Custom toast system with auto-dismiss and progress indicators
- **Articles System**: Blog posts with categories, tags, and search functionality
- **API Management**: API key generation, usage tracking, and quota management
- **Interactive UI**: Carousels, animations, and micro-interactions using Framer Motion and GSAP
- **Accessibility**: ARIA compliant components with keyboard navigation support
- **Three.js Integration**: 3D rendering capabilities with React Three Fiber
- **Session Management**: Secure user sessions with NextAuth.js
- **Global CDN**: Cloudflare integration for enhanced performance and security

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with class-variance-authority
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Animation**:
  - Framer Motion for UI animations
  - GSAP for advanced animations and transitions
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation
- **Authentication**: NextAuth.js with custom email verification flow
- **Database**: MongoDB for user data and application state
- **CMS**: Headless WordPress API with custom integration
- **Email Service**: Resend.com with custom responsive templates
- **3D Rendering**: Three.js with React Three Fiber
- **API Integration**: Custom API client with rate limiting and authentication
- **CDN & Security**: Cloudflare for edge caching and DDoS protection
- **Notifications**: Custom toast system with progress indicators

## Project Structure

```
├── src/
│   ├── app/               # Next.js application routes (App Router)
│   │   ├── (auth)/        # Authentication-related routes
│   │   ├── api/           # API routes and endpoints
│   │   └── (default)/     # Main application routes
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── body/          # Page-specific components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── elements/      # Reusable UI elements
│   │   ├── home/          # Homepage-specific components
│   │   ├── mdx/           # MDX rendering components
│   │   └── ui/            # shadcn/ui components
│   ├── config/            # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   │   ├── auth/          # Authentication utilities
│   │   ├── email/         # Email templates and utilities
│   │   └── wordpress-api.ts  # WordPress API integration
│   ├── providers/         # React context providers
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
- MongoDB instance or connection string
- WordPress instance with REST API enabled
- Resend.com API key for email functionality

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

Edit `.env.local` with your configuration values including:

- Database connection strings
- NextAuth secrets
- WordPress API endpoints
- Resend API keys
- Cloudflare tokens (if applicable)

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

### Email System

The application includes a comprehensive email system with:

- Professional responsive email templates
- Dark mode styling consistent with the app theme
- Email verification flow with automatic redirect
- Password reset functionality
- Custom branding and styling

### User Authentication

Complete authentication system with:

- User registration with email verification
- Password reset flow
- Session management with NextAuth.js
- API token generation for programmatic access
- Role-based authorization

## Deployment

This application is designed to be deployed on Vercel or any Next.js-compatible hosting service with Cloudflare integration for enhanced performance and security.

### Cloudflare Setup

For Cloudflare integration:

1. Create a Cloudflare account and add your domain
2. Set up Cloudflare Pages or Web Workers as needed
3. Configure environment variables in Cloudflare dashboard
4. Set up appropriate caching rules

## License

MIT License

Copyright (c) 2026 Cadogy

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
