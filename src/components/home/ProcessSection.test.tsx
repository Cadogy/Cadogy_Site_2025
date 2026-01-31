import { render, screen } from "@/test/utils"
import { ProcessSection } from "./ProcessSection"

describe("ProcessSection", () => {
  describe("rendering", () => {
    it("should render section title", () => {
      render(<ProcessSection />)

      expect(screen.getByText(/How We Work/i)).toBeInTheDocument()
    })

    it("should render all process steps", () => {
      render(<ProcessSection />)

      expect(screen.getByText("Discovery & Planning")).toBeInTheDocument()
      expect(screen.getByText("Development & Testing")).toBeInTheDocument()
      expect(screen.getByText("Launch & Support")).toBeInTheDocument()
    })

    it("should render step numbers", () => {
      render(<ProcessSection />)

      expect(screen.getByText("01")).toBeInTheDocument()
      expect(screen.getByText("02")).toBeInTheDocument()
      expect(screen.getByText("03")).toBeInTheDocument()
    })

    it("should render in a grid layout", () => {
      const { container } = render(<ProcessSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toBeInTheDocument()
    })
  })

  describe("customization", () => {
    it("should accept custom title", () => {
      render(<ProcessSection title="Our Process" />)

      expect(screen.getByText("Our Process")).toBeInTheDocument()
      expect(screen.queryByText(/How We Work/i)).not.toBeInTheDocument()
    })

    it("should accept custom subtitle", () => {
      render(<ProcessSection subtitle="From idea to launch" />)

      expect(screen.getByText("From idea to launch")).toBeInTheDocument()
    })
  })

  describe("structure", () => {
    it("should be a semantic section element", () => {
      const { container } = render(<ProcessSection />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      render(<ProcessSection />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(/How We Work/i)
    })
  })

  describe("animation", () => {
    it("should render with animation elements", () => {
      const { container } = render(<ProcessSection />)

      // Framer Motion adds style attributes
      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("accessibility", () => {
    it("should have all steps visible in the document", () => {
      render(<ProcessSection />)

      expect(screen.getByText("Discovery & Planning")).toBeInTheDocument()
      expect(screen.getByText("Development & Testing")).toBeInTheDocument()
      expect(screen.getByText("Launch & Support")).toBeInTheDocument()
    })

    it("should render icons for each step", () => {
      const { container } = render(<ProcessSection />)

      // Check for SVG icons
      const icons = container.querySelectorAll("svg")
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe("responsive layout", () => {
    it("should render with responsive grid classes", () => {
      const { container } = render(<ProcessSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toHaveClass("grid-cols-1")
      expect(grid).toHaveClass("md:grid-cols-2")
      expect(grid).toHaveClass("lg:grid-cols-3")
    })
  })

  describe("content", () => {
    it("should render step descriptions", () => {
      render(<ProcessSection />)

      expect(
        screen.getByText(
          /We begin by understanding your goals, analyzing requirements/i
        )
      ).toBeInTheDocument()
    })
  })
})
