import { render, screen } from "@/test/utils"
import { TechnologyShowcaseSection } from "./TechnologyShowcaseSection"

describe("TechnologyShowcaseSection", () => {
  describe("rendering", () => {
    it("should render section title", () => {
      render(<TechnologyShowcaseSection />)

      expect(
        screen.getByText(/Technologies We Master/i)
      ).toBeInTheDocument()
    })

    it("should render all technology items", () => {
      render(<TechnologyShowcaseSection />)

      // Check for some key technologies
      expect(screen.getByText("React")).toBeInTheDocument()
      expect(screen.getByText("Next.js")).toBeInTheDocument()
      expect(screen.getByText("TypeScript")).toBeInTheDocument()
      expect(screen.getByText("Node.js")).toBeInTheDocument()
    })

    it("should render technologies in a grid layout", () => {
      const { container } = render(<TechnologyShowcaseSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toBeInTheDocument()
    })
  })

  describe("customization", () => {
    it("should accept custom title", () => {
      render(<TechnologyShowcaseSection title="Our Tech Stack" />)

      expect(screen.getByText("Our Tech Stack")).toBeInTheDocument()
      expect(
        screen.queryByText(/Technologies We Master/i)
      ).not.toBeInTheDocument()
    })

    it("should accept custom subtitle", () => {
      render(
        <TechnologyShowcaseSection subtitle="Built with modern tools" />
      )

      expect(screen.getByText("Built with modern tools")).toBeInTheDocument()
    })
  })

  describe("structure", () => {
    it("should be a semantic section element", () => {
      const { container } = render(<TechnologyShowcaseSection />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      render(<TechnologyShowcaseSection />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(/Technologies We Master/i)
    })
  })

  describe("animation", () => {
    it("should render with animation elements", () => {
      const { container } = render(<TechnologyShowcaseSection />)

      // Framer Motion adds style attributes
      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("accessibility", () => {
    it("should have all text visible in the document", () => {
      render(<TechnologyShowcaseSection />)

      expect(
        screen.getByText(/Technologies We Master/i)
      ).toBeInTheDocument()
      expect(screen.getByText("React")).toBeInTheDocument()
    })

    it("should render technology icons", () => {
      const { container } = render(<TechnologyShowcaseSection />)

      // Check for SVG icons
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe("responsive layout", () => {
    it("should render with responsive grid classes", () => {
      const { container } = render(<TechnologyShowcaseSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toHaveClass("grid-cols-2")
    })
  })
})
