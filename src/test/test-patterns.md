# Component Testing Patterns

## Overview

This document outlines testing patterns for the Cadogy project. All components must be tested using Test-Driven Development (TDD) following the RED-GREEN-REFACTOR cycle.

## Setup

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Environment**: jsdom
- **Globals**: Enabled (`describe`, `it`, `expect` are globally available)

## Core Principles

1. **Test behavior, not implementation**
2. **Use real user interactions**
3. **Avoid testing internal state**
4. **Write tests first (TDD non-negotiable)**

## Testing Pattern Categories

### 1. Presentational Components

Components that only render UI based on props.

**Example**: `StatCard.test.tsx`

```typescript
import { render, screen } from "@/test/utils"

describe("StatCard", () => {
  it("should render stat value and label", () => {
    render(<StatCard value="15+" label="Years in Business" />)

    expect(screen.getByText("15+")).toBeInTheDocument()
    expect(screen.getByText("Years in Business")).toBeInTheDocument()
  })

  it("should apply correct styling variant", () => {
    const { container } = render(
      <StatCard value="500+" label="Projects" variant="large" />
    )

    const card = container.firstChild
    expect(card).toHaveClass("text-4xl") // Large variant class
  })

  it("should be accessible", () => {
    render(<StatCard value="98%" label="Client Satisfaction" />)

    // Check for proper ARIA attributes
    const stat = screen.getByText("98%")
    expect(stat).toBeVisible()
  })
})
```

### 2. Container Components with Data

Components that fetch or manage data.

**Example**: `StatsSection.test.tsx`

```typescript
import { render, screen } from "@/test/utils"
import { createStatsData } from "@/test/factories"

describe("StatsSection", () => {
  it("should render multiple stat cards", () => {
    const stats = createStatsData([
      { value: "15+", label: "Years" },
      { value: "500+", label: "Projects" },
    ])

    render(<StatsSection stats={stats} />)

    expect(screen.getByText("15+")).toBeInTheDocument()
    expect(screen.getByText("500+")).toBeInTheDocument()
  })

  it("should handle empty stats array", () => {
    render(<StatsSection stats={[]} />)

    expect(screen.queryByRole("article")).not.toBeInTheDocument()
  })
})
```

### 3. Interactive Components

Components with user interactions (clicks, hovers, etc.).

**Example**: `BentoCard.test.tsx`

```typescript
import { render, screen } from "@/test/utils"
import userEvent from "@testing-library/user-event"

describe("BentoCard", () => {
  it("should handle click interactions", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <BentoCard
        title="Service"
        onClick={handleClick}
      />
    )

    await user.click(screen.getByText("Service"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should show hover state", async () => {
    const user = userEvent.setup()

    render(<BentoCard title="Service" />)
    const card = screen.getByText("Service").parentElement

    await user.hover(card!)
    // Test hover state behavior
  })
})
```

### 4. Animated Components

Components using Framer Motion or other animation libraries.

**Example**: Testing scroll animations

```typescript
import { render, screen } from "@/test/utils"

describe("ImpactSection", () => {
  it("should render content regardless of animation state", () => {
    render(<ImpactSection />)

    // Test that content is present, not animation details
    expect(screen.getByText(/The power of 200 developers/i)).toBeInTheDocument()
  })

  it("should be accessible to screen readers", () => {
    const { container } = render(<ImpactSection />)

    // Ensure animated elements are not hidden from screen readers
    const content = screen.getByText(/The power of 200 developers/i)
    expect(content).toBeVisible()
  })
})
```

## Factory Functions for Test Data

Use factory functions to create test data, not `let` or `beforeEach`.

**Example**: `src/test/factories/stats.ts`

```typescript
type StatCardData = {
  value: string
  label: string
  description?: string
}

export function createStatCardData(
  overrides: Partial<StatCardData> = {}
): StatCardData {
  return {
    value: "100+",
    label: "Default Label",
    ...overrides,
  }
}

export function createStatsData(
  items: Array<Partial<StatCardData>>
): StatCardData[] {
  return items.map((item) => createStatCardData(item))
}
```

**Usage in tests**:

```typescript
it("should render stat with custom data", () => {
  const stat = createStatCardData({ value: "15+", label: "Years" })
  render(<StatCard {...stat} />)
  expect(screen.getByText("15+")).toBeInTheDocument()
})
```

## Test Organization

### File Structure

```
src/
  components/
    stats/
      StatCard.tsx
      StatCard.test.tsx       # Colocated with component
      StatsSection.tsx
      StatsSection.test.tsx
  test/
    setup.ts                  # Global test setup
    utils.tsx                 # Custom render utilities
    test-patterns.md          # This file
    factories/                # Factory functions for test data
      stats.ts
      bento.ts
```

### Test Structure

```typescript
describe("ComponentName", () => {
  describe("rendering", () => {
    it("should render with default props", () => {})
    it("should render with custom props", () => {})
  })

  describe("interactions", () => {
    it("should handle click events", () => {})
    it("should handle keyboard navigation", () => {})
  })

  describe("accessibility", () => {
    it("should have proper ARIA labels", () => {})
    it("should be keyboard navigable", () => {})
  })

  describe("edge cases", () => {
    it("should handle missing data gracefully", () => {})
    it("should handle empty states", () => {})
  })
})
```

## Common Testing Utilities

### Custom Render with Providers

Located in `src/test/utils.tsx`:

```typescript
import { render, RenderOptions } from "@testing-library/react"

function AllTheProviders({ children }) {
  return (
    // Add any global providers here (Theme, Router, etc.)
    <>{children}</>
  )
}

export function customRender(ui, options) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}
```

### Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from "jest-axe"

expect.extend(toHaveNoViolations)

it("should have no accessibility violations", async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## What NOT to Test

❌ **Don't test implementation details**:
```typescript
// Bad
expect(component.state.isOpen).toBe(true)

// Good
expect(screen.getByRole("dialog")).toBeVisible()
```

❌ **Don't test library code**:
```typescript
// Bad - testing Framer Motion's animation
expect(element).toHaveStyle({ opacity: 0.5 })

// Good - test your component's behavior
expect(screen.getByText("Content")).toBeInTheDocument()
```

❌ **Don't test styles directly**:
```typescript
// Bad
expect(element).toHaveClass("text-blue-500")

// Good - test visual behavior if needed
expect(element).toBeVisible()
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test:coverage

# Run specific test file
npm test -- StatCard.test.tsx
```

## TDD Workflow

Every component follows the RED-GREEN-REFACTOR cycle:

### 1. RED - Write Failing Test

```typescript
describe("StatCard", () => {
  it("should render stat value", () => {
    render(<StatCard value="15+" label="Years" />)
    expect(screen.getByText("15+")).toBeInTheDocument()
  })
})
```

**Run test**: It should fail because `StatCard` doesn't exist yet.

### 2. GREEN - Write Minimal Code

```typescript
type StatCardProps = {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps): JSX.Element {
  return <div>{value}</div>
}
```

**Run test**: It should pass with minimal implementation.

### 3. REFACTOR - Improve Code

```typescript
export function StatCard({ value, label }: StatCardProps): JSX.Element {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
```

**Run test**: Should still pass after refactoring.

## Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TDD with React](https://testdriven.io/blog/tdd-react/)

## Summary

- Write tests first (TDD non-negotiable)
- Test behavior, not implementation
- Use factory functions for test data
- Colocate tests with components
- Follow RED-GREEN-REFACTOR cycle
- Focus on user interactions and accessibility
