import { render, screen } from "@/test/utils"
import { CaseStudiesSection } from "./CaseStudiesSection"

describe("CaseStudiesSection", () => {
  describe("rendering", () => {
    it("should render section title", () => {
      render(<CaseStudiesSection />)

      expect(screen.getByText(/Our Work/i)).toBeInTheDocument()
    })

    it("should render all case study cards", () => {
      render(<CaseStudiesSection />)

      expect(screen.getByText("E-Commerce Transformation")).toBeInTheDocument()
      expect(screen.getByText("Healthcare Portal")).toBeInTheDocument()
      expect(screen.getByText("FinTech Platform")).toBeInTheDocument()
    })

    it("should render in a grid layout", () => {
      const { container } = render(<CaseStudiesSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toBeInTheDocument()
    })
  })

  describe("customization", () => {
    it("should accept custom title", () => {
      render(<CaseStudiesSection title="Case Studies" />)

      expect(screen.getByText("Case Studies")).toBeInTheDocument()
      expect(screen.queryByText(/Our Work/i)).not.toBeInTheDocument()
    })

    it("should accept custom subtitle", () => {
      render(<CaseStudiesSection subtitle="See what we've built" />)

      expect(screen.getByText("See what we've built")).toBeInTheDocument()
    })
  })

  describe("structure", () => {
    it("should be a semantic section element", () => {
      const { container } = render(<CaseStudiesSection />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      render(<CaseStudiesSection />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(/Our Work/i)
    })
  })

  describe("animation", () => {
    it("should render with animation elements", () => {
      const { container } = render(<CaseStudiesSection />)

      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("accessibility", () => {
    it("should have all case studies visible", () => {
      render(<CaseStudiesSection />)

      expect(screen.getByText("E-Commerce Transformation")).toBeInTheDocument()
      expect(screen.getByText("Healthcare Portal")).toBeInTheDocument()
      expect(screen.getByText("FinTech Platform")).toBeInTheDocument()
    })

    it("should render all links", () => {
      render(<CaseStudiesSection />)

      const links = screen.getAllByRole("link")
      expect(links.length).toBe(3)
    })
  })

  describe("responsive layout", () => {
    it("should render with responsive grid classes", () => {
      const { container } = render(<CaseStudiesSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toHaveClass("grid-cols-1")
      expect(grid).toHaveClass("md:grid-cols-2")
      expect(grid).toHaveClass("lg:grid-cols-3")
    })
  })
})
