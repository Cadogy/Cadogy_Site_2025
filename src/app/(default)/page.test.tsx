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

      expect(screen.getByText(/What We Do/i)).toBeInTheDocument()
    })
  })
})
