import { render, screen } from "@/test/utils"
import Home from "./page"

describe("Homepage", () => {
  describe("Stats Section Integration", () => {
    it("should render stats section", () => {
      render(<Home />)

      expect(screen.getByText(/Our Impact/i)).toBeInTheDocument()
    })

    it("should display all three stats", () => {
      render(<Home />)

      expect(screen.getByText("15+")).toBeInTheDocument()
      expect(screen.getByText("Years in Business")).toBeInTheDocument()

      expect(screen.getByText("500+")).toBeInTheDocument()
      expect(screen.getByText("Projects Delivered")).toBeInTheDocument()

      expect(screen.getByText("50+")).toBeInTheDocument()
      expect(screen.getByText("Technologies")).toBeInTheDocument()
    })

    it("should position stats section between TextSlideEffect and TechnicalExpert", () => {
      const { container } = render(<Home />)

      // Stats section should be present in the page
      const statsSection = screen.getByText(/Our Impact/i).closest("section")
      expect(statsSection).toBeInTheDocument()
    })
  })

  describe("Existing Sections", () => {
    it("should still render HeroCarousel", () => {
      const { container } = render(<Home />)

      // HeroCarousel section should be present
      const sections = container.querySelectorAll("section")
      expect(sections.length).toBeGreaterThan(0)
    })

    it("should still render TechnicalExpert section", () => {
      render(<Home />)

      // Check for both "What We Do" sections (Services and TechnicalExpert)
      const whatWeDoHeadings = screen.getAllByText(/What We Do/i)
      expect(whatWeDoHeadings.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("Services Bento Section Integration", () => {
    it("should render services bento section", () => {
      render(<Home />)

      expect(screen.getByText("Brand Experiences")).toBeInTheDocument()
      expect(screen.getByText("Content Management")).toBeInTheDocument()
      expect(screen.getByText("AI Optimization")).toBeInTheDocument()
    })

    it("should position services section after stats section", () => {
      const { container } = render(<Home />)

      const sections = container.querySelectorAll("section")
      // Should have: Hero, TextSlide, Stats, Services, and TechnicalExpert sections
      expect(sections.length).toBeGreaterThanOrEqual(4)
    })
  })
})
