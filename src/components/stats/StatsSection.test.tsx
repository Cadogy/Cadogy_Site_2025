import { render, screen } from "@/test/utils"
import { createStatsData, createDefaultStats } from "@/test/factories/stats"
import { StatsSection } from "./StatsSection"

describe("StatsSection", () => {
  describe("rendering", () => {
    it("should render section title", () => {
      const stats = createDefaultStats()

      render(<StatsSection stats={stats} />)

      expect(screen.getByText(/Our Impact/i)).toBeInTheDocument()
    })

    it("should render multiple stat cards", () => {
      const stats = createStatsData([
        { value: "15+", label: "Years in Business" },
        { value: "500+", label: "Projects Delivered" },
        { value: "50+", label: "Technologies" },
      ])

      render(<StatsSection stats={stats} />)

      expect(screen.getByText("15+")).toBeInTheDocument()
      expect(screen.getByText("Years in Business")).toBeInTheDocument()
      expect(screen.getByText("500+")).toBeInTheDocument()
      expect(screen.getByText("Projects Delivered")).toBeInTheDocument()
      expect(screen.getByText("50+")).toBeInTheDocument()
      expect(screen.getByText("Technologies")).toBeInTheDocument()
    })

    it("should arrange stats in a responsive grid", () => {
      const stats = createDefaultStats()

      const { container } = render(<StatsSection stats={stats} />)

      const grid = container.querySelector(".stats-grid")
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass("grid")
    })

    it("should apply proper spacing between stats", () => {
      const stats = createDefaultStats()

      const { container } = render(<StatsSection stats={stats} />)

      const grid = container.querySelector(".stats-grid")
      expect(grid).toHaveClass("gap-6")
    })
  })

  describe("with different numbers of stats", () => {
    it("should handle single stat", () => {
      const stats = createStatsData([{ value: "15+", label: "Years" }])

      render(<StatsSection stats={stats} />)

      expect(screen.getByText("15+")).toBeInTheDocument()
    })

    it("should handle two stats", () => {
      const stats = createStatsData([
        { value: "15+", label: "Years" },
        { value: "500+", label: "Projects" },
      ])

      render(<StatsSection stats={stats} />)

      expect(screen.getByText("15+")).toBeInTheDocument()
      expect(screen.getByText("500+")).toBeInTheDocument()
    })

    it("should handle four stats", () => {
      const stats = createStatsData([
        { value: "15+", label: "Years" },
        { value: "500+", label: "Projects" },
        { value: "50+", label: "Technologies" },
        { value: "98%", label: "Satisfaction" },
      ])

      render(<StatsSection stats={stats} />)

      expect(screen.getAllByText(/\+|%/)).toHaveLength(4)
    })
  })

  describe("edge cases", () => {
    it("should handle empty stats array", () => {
      render(<StatsSection stats={[]} />)

      expect(screen.getByText(/Our Impact/i)).toBeInTheDocument()
      expect(screen.queryByText("15+")).not.toBeInTheDocument()
    })

    it("should not render grid when no stats", () => {
      const { container } = render(<StatsSection stats={[]} />)

      const grid = container.querySelector(".stats-grid")
      expect(grid).not.toBeInTheDocument()
    })
  })

  describe("customization", () => {
    it("should accept custom title", () => {
      const stats = createDefaultStats()

      render(<StatsSection stats={stats} title="Our Achievements" />)

      expect(screen.getByText("Our Achievements")).toBeInTheDocument()
      expect(screen.queryByText(/Our Impact/i)).not.toBeInTheDocument()
    })

    it("should accept optional subtitle", () => {
      const stats = createDefaultStats()

      render(
        <StatsSection
          stats={stats}
          subtitle="Building digital excellence since 2010"
        />
      )

      expect(
        screen.getByText("Building digital excellence since 2010")
      ).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have semantic section element", () => {
      const stats = createDefaultStats()

      const { container } = render(<StatsSection stats={stats} />)

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      const stats = createDefaultStats()

      render(<StatsSection stats={stats} />)

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent(/Our Impact/i)
    })
  })
})
