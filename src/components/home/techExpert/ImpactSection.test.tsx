import { render, screen } from "@/test/utils"
import ImpactSection from "./ImpactSection"

describe("ImpactSection", () => {
  describe("rendering", () => {
    it("should render the main heading", () => {
      render(<ImpactSection />)

      expect(
        screen.getByText(
          /The power of 200 developers\. The agility of a boutique team\./i
        )
      ).toBeInTheDocument()
    })

    it("should render the description text", () => {
      render(<ImpactSection />)

      expect(
        screen.getByText(/We leverage AI to multiply our capabilities/i)
      ).toBeInTheDocument()
    })

    it("should render the CTA link", () => {
      render(<ImpactSection />)

      const ctaLink = screen.getByRole("link", { name: /See How We Work/i })
      expect(ctaLink).toBeInTheDocument()
      expect(ctaLink).toHaveAttribute("href", "/contact")
    })
  })

  describe("layout", () => {
    it("should render in a two-column grid layout", () => {
      const { container } = render(<ImpactSection />)

      const grid = container.querySelector(".lg\\:grid-cols-2")
      expect(grid).toBeInTheDocument()
    })

    it("should be a semantic section element", () => {
      const { container } = render(<ImpactSection />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(<ImpactSection />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(
        /The power of 200 developers\. The agility of a boutique team\./i
      )
    })

    it("should have accessible link text", () => {
      render(<ImpactSection />)

      const link = screen.getByRole("link", { name: /See How We Work/i })
      expect(link).toBeInTheDocument()
    })

    it("should have all text visible in the document", () => {
      render(<ImpactSection />)

      expect(
        screen.getByText(
          /The power of 200 developers\. The agility of a boutique team\./i
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText(/We leverage AI to multiply our capabilities/i)
      ).toBeInTheDocument()
    })
  })

  describe("animations", () => {
    it("should render with animation elements", () => {
      const { container } = render(<ImpactSection />)

      // Framer Motion adds style attributes
      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("content", () => {
    it("should maintain the original power statement", () => {
      render(<ImpactSection />)

      expect(
        screen.getByText(
          /The power of 200 developers\. The agility of a boutique team\./i
        )
      ).toBeInTheDocument()
    })

    it("should explain AI capabilities", () => {
      render(<ImpactSection />)

      expect(
        screen.getByText(
          /What traditionally requires massive teams and budgets/i
        )
      ).toBeInTheDocument()
    })
  })

  describe("CTA interactions", () => {
    it("should have correct href on CTA link", () => {
      render(<ImpactSection />)

      const link = screen.getByRole("link", { name: /See How We Work/i })
      expect(link).toHaveAttribute("href", "/contact")
    })

    it("should render arrow icon in CTA", () => {
      const { container } = render(<ImpactSection />)

      const link = screen.getByRole("link", { name: /See How We Work/i })
      const svg = link.querySelector("svg")
      expect(svg).toBeInTheDocument()
    })
  })
})
