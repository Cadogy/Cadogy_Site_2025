import { render, screen } from "@/test/utils"
import { ServicesBentoSection } from "./ServicesBentoSection"

describe("ServicesBentoSection", () => {
  describe("rendering", () => {
    it("should render section title", () => {
      render(<ServicesBentoSection />)

      expect(screen.getByText(/What We Do/i)).toBeInTheDocument()
    })

    it("should render all service cards", () => {
      render(<ServicesBentoSection />)

      expect(screen.getByText("Brand Experiences")).toBeInTheDocument()
      expect(screen.getByText("Content Management")).toBeInTheDocument()
      expect(screen.getByText("AI Optimization")).toBeInTheDocument()
    })

    it("should render in bento grid layout", () => {
      const { container } = render(<ServicesBentoSection />)

      const grid = container.querySelector(".grid")
      expect(grid).toBeInTheDocument()
    })
  })

  describe("customization", () => {
    it("should accept custom title", () => {
      render(<ServicesBentoSection title="Our Services" />)

      expect(screen.getByText("Our Services")).toBeInTheDocument()
      expect(screen.queryByText(/What We Do/i)).not.toBeInTheDocument()
    })

    it("should accept custom subtitle", () => {
      render(
        <ServicesBentoSection subtitle="Building digital excellence" />
      )

      expect(
        screen.getByText("Building digital excellence")
      ).toBeInTheDocument()
    })
  })

  describe("structure", () => {
    it("should be a semantic section element", () => {
      const { container } = render(<ServicesBentoSection />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      render(<ServicesBentoSection />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(/What We Do/i)
    })
  })

  describe("animation", () => {
    it("should render with animation elements", () => {
      const { container } = render(<ServicesBentoSection />)

      // Framer Motion adds style attributes
      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("accessibility", () => {
    it("should be visible to screen readers", () => {
      render(<ServicesBentoSection />)

      const title = screen.getByText(/What We Do/i)
      expect(title).toBeInTheDocument()
    })

    it("should have accessible content", () => {
      render(<ServicesBentoSection />)

      const cards = screen.getAllByText(/Management|Experiences|Optimization/)
      cards.forEach((card) => {
        expect(card).toBeInTheDocument()
      })
    })
  })
})
