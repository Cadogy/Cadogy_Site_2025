import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"

// Mock IntersectionObserver for Framer Motion animations
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver

afterEach(() => {
  cleanup()
})
