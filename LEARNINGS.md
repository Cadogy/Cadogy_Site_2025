# Learnings & Discoveries

## Project Overview
**Project**: Cadogy Homepage Redesign
**Started**: 2026-01-30
**Design Inspiration**: Stripe.com

## Technical Stack Observations

### Current Architecture
- **Framework**: Next.js 14.1.1 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion for complex animations
- **UI Components**: Radix UI (shadcn/ui components)
- **Content**: WordPress headless CMS integration
- **Testing**: No test framework currently installed (needs setup)

### Existing Components Structure
```
src/components/
├── elements/          # Reusable UI elements (HeroCarousel, TextSlideEffect)
├── home/             # Homepage-specific components (TechnicalExpert, etc.)
│   └── techExpert/   # Nested homepage sections (GoodAtSection, ImpactSection)
├── ui/               # Base UI components from shadcn/ui
├── mdx/              # MDX-specific components
└── [other domains]   # Feature-specific component directories
```

### Key Findings

#### 1. WordPress Integration Pattern
- Uses WordPress REST API via headless CMS approach
- HeroCarousel fetches posts from WordPress with `getAllPosts()`
- Featured media and author data fetched via `_embedded` parameter
- Image URLs include cache-busting with `preventImageCaching()` utility
- HTML entities decoded with `decodeHtml()` utility
- **Location**: `src/lib/wordpress-api.ts` (inferred, not yet examined)

#### 2. Animation Patterns
- Heavy use of Framer Motion for sophisticated animations
- Common pattern: `whileInView` for scroll-triggered animations
- Hover states managed with local state (`hoveredCard`)
- AnimatePresence used for enter/exit animations
- GSAP available (`@gsap/react`) but not heavily used in homepage

#### 3. Responsive Design Approach
- Mobile-first design with `md:` and `lg:` breakpoints
- Custom hook pattern for window resize detection
- Manual state management for `isMobile` (useEffect + window.addEventListener)
- Tailwind breakpoints: mobile (default), md (768px), lg (1024px)

#### 4. Component Patterns Observed
- Mix of "use client" components (for interactivity)
- Props are well-typed with TypeScript interfaces
- Some components use default exports, others named exports (inconsistent)
- Configuration data often inline (e.g., `services` array in GoodAtSection)

#### 5. Current Homepage Structure
```
Current Layout:
1. HeroCarousel (WordPress articles, 5 slides)
2. TextSlideEffect (animated text scroll)
3. TechnicalExpert
   ├── GoodAtSection (3 service cards)
   └── ImpactSection (value proposition)
```

## Design Observations

### Current Design Language
- **Color Scheme**: Dark theme with neutral backgrounds
- **Typography**: Large, bold headings (text-4xl to text-7xl)
- **Spacing**: Generous padding (py-20, py-32)
- **Cards**: Image-based with overlays (gradient overlays for text readability)
- **Animations**: Subtle scale transforms on hover (scale-105)
- **Borders**: Rounded corners (rounded-lg)

### Stripe Design Patterns to Incorporate
1. **Bento Grids**: Asymmetric, modular card layouts
2. **Stats Sections**: Bold numbers with labels
3. **Generous Whitespace**: More breathing room between sections
4. **Progressive Disclosure**: Information revealed on interaction
5. **Functional Color**: Purposeful use of color for hierarchy
6. **Subtle Motion**: Smooth, purposeful animations
7. **Clear Hierarchy**: Strong typographic contrast

## Development Insights

### Testing Gaps
- No test files found in `src/` directory
- Testing framework needs to be setup from scratch
- Consider Vitest for faster test execution (Vite-based)
- React Testing Library for component testing
- Need to establish testing patterns before implementation

### TypeScript Configuration
- Strict mode enabled ✓
- Path aliases configured (`@/*` → `./src/*`) ✓
- ES6 target
- Isolatedmodules enabled (required for Next.js)

### Package Management
- Using `pnpm` as package manager
- Scripts available: `dev`, `build`, `start`, `lint`, `format`, `format:check`
- No test script currently defined

## Best Practices to Follow

### Component Development
1. **Always test first** (TDD non-negotiable)
2. **Pure functions preferred** for utilities
3. **Immutable data patterns** throughout
4. **No `any` types** in TypeScript
5. **Explicit return types** for functions
6. **Proper prop destructuring** for clarity

### File Organization
1. Component files with `.tsx` extension
2. Test files colocated with components (`.test.tsx`)
3. Types/interfaces defined at top of file
4. Configuration in separate `config.ts` files
5. Utilities in `lib/` directory

### Naming Conventions
- Components: PascalCase (e.g., `StatCard`, `BentoGrid`)
- Files: Match component name (e.g., `StatCard.tsx`)
- Props interfaces: ComponentNameProps (e.g., `StatCardProps`)
- Utilities: camelCase (e.g., `formatStatValue`)
- Config files: kebab-case (e.g., `stats-config.ts`)

## Potential Challenges

### 1. Testing Setup
- **Challenge**: No existing test infrastructure
- **Solution**: Phase 1 dedicated to testing setup
- **Risk**: Medium (common task, well-documented)

### 2. WordPress Integration Preservation
- **Challenge**: Maintain existing WordPress data flow
- **Solution**: Don't modify wordpress-api utilities, only consume them
- **Risk**: Low (read-only operations)

### 3. Component Composition Complexity
- **Challenge**: Multiple nested sections, grid layouts
- **Solution**: Small, composable components with clear responsibilities
- **Risk**: Medium (requires careful planning)

### 4. Animation Performance
- **Challenge**: Multiple animated sections could impact performance
- **Solution**: Use CSS transforms, respect reduced-motion, lazy load sections
- **Risk**: Medium (requires testing on various devices)

### 5. Responsive Design Complexity
- **Challenge**: Bento grids can be complex on mobile
- **Solution**: Different layouts for mobile (stack cards vertically)
- **Risk**: Low (Tailwind makes this straightforward)

## Questions Raised During Analysis

1. **Testing Framework**: Should we use Vitest or Jest?
   - **Recommendation**: Vitest (faster, better TypeScript support, modern)

2. **Data Source for Stats**: Where do stats come from?
   - **Options**: Hardcoded config, WordPress API, database query
   - **Recommendation**: Start with config file, make extensible later

3. **Image Optimization**: How to handle new images for sections?
   - **Recommendation**: Use Next.js Image component, serve from WordPress or static

4. **Animation Library**: Stick with Framer Motion or use GSAP?
   - **Recommendation**: Framer Motion (already heavily used, React-friendly)

5. **Component Library**: Extend shadcn/ui or create custom?
   - **Recommendation**: Extend shadcn/ui for consistency

## Resources & References

### Design Inspiration
- **Stripe Homepage**: https://stripe.com (reference for spacing, layout, animation)
- **Bento Grid Examples**: https://stripe.com/payments (product pages)

### Technical Documentation
- **Next.js App Router**: https://nextjs.org/docs/app
- **Framer Motion**: https://www.framer.com/motion/
- **Radix UI**: https://www.radix-ui.com/
- **React Testing Library**: https://testing-library.com/react
- **Vitest**: https://vitest.dev/

### Testing Patterns
- **Kent C. Dodds - Testing Library Best Practices**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- **TDD with React**: https://testdriven.io/blog/tdd-react/

## Iteration Insights
*This section will be updated as we progress through implementation*

### Iteration 1: Phase 1 - Testing Infrastructure
- **Date**: 2026-01-30
- **Phase**: Testing Infrastructure Setup
- **Key Learnings**:
  - Vitest v4.0.18 works well with Next.js 14 and React 18
  - `globals: true` config eliminates need to import `describe`, `it`, `expect`
  - Must avoid importing vitest functions in setup files when using globals
  - npm worked better than pnpm for installing test dependencies (GSAP token issue with pnpm)
  - jsdom environment provides adequate DOM simulation for React Testing Library
  - Colocating tests with components keeps codebase organized
- **Challenges Encountered**:
  1. GSAP token issue preventing pnpm from installing packages
  2. Initial test failure: importing vitest functions in setup.ts with globals enabled
  3. Missing `@testing-library/dom` dependency
- **Solutions Applied**:
  1. Used npm with `--legacy-peer-deps` flag to install test dependencies
  2. Removed vitest imports from setup.ts, relied on globals
  3. Installed `@testing-library/dom` separately
  4. Created comprehensive test patterns documentation
  5. Established factory functions pattern for test data

### Iteration 2: [Pending]
- Date:
- Phase:
- Key Learnings:
- Challenges Encountered:
- Solutions Applied:

## Team Feedback
*Space for capturing feedback from reviews and discussions*

## Future Considerations

### Potential Enhancements (Post-MVP)
1. **A/B Testing Framework**: Test different CTA variations
2. **Analytics Integration**: Track user engagement with sections
3. **Dynamic Content**: Pull stats from live data sources
4. **Internationalization**: Multi-language support
5. **Dark/Light Theme Toggle**: Expand beyond current dark theme
6. **Micro-interactions**: Additional hover/click animations
7. **Video Integration**: Background videos or testimonial videos

### Technical Debt to Watch
1. Inconsistent component export styles (default vs named)
2. Manual resize listeners (consider hook library)
3. Inline configuration data (move to config files)
4. No error boundaries
5. No loading states for dynamic content (beyond carousel)

## Changelog
- **2026-01-30 09:00**: Initial project analysis, PLAN.md, WIP.md, LEARNINGS.md created
- **2026-01-30 09:30**: Plan approved by client with content decisions:
  - Stats: 15+ Years, 500+ Projects, 50+ Technologies
  - Case Studies: 2 placeholder projects
  - Technologies: React, Next.js, TypeScript, Tailwind, Node.js, Python, PHP, AWS, Vercel, Cloudflare, WordPress, Contentful, Supabase
  - Process: Discovery & Planning, Development & Testing, Launch & Support
  - CTA: "Start Your Project" → /contact
- **2026-01-30 09:45**: Phase 1 - Testing Infrastructure Setup began
- **2026-01-30 23:21**: Phase 1 - Testing Infrastructure Setup COMPLETED ✅
  - Vitest configured and working
  - React Testing Library setup
  - Test utilities created (render, mocks, factories)
  - Testing patterns documented in src/test/test-patterns.md
  - First passing tests verified
- **2026-01-30 23:22**: Ready to begin Phase 2 - Stats Section
