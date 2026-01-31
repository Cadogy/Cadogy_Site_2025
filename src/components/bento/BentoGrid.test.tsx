import { render, screen } from "@/test/utils"
import { BentoGrid } from "./BentoGrid"

describe("BentoGrid", () => {
  describe("rendering", () => {
    it("should render children", () => {
      render(
        <BentoGrid>
          <div>Child 1</div>
          <div>Child 2</div>
        </BentoGrid>
      )

      expect(screen.getByText("Child 1")).toBeInTheDocument()
      expect(screen.getByText("Child 2")).toBeInTheDocument()
    })

    it("should apply grid layout", () => {
      const { container } = render(
        <BentoGrid>
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("grid")
    })

    it("should apply default gap", () => {
      const { container } = render(
        <BentoGrid>
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("gap-6")
    })
  })

  describe("patterns", () => {
    it("should apply default pattern", () => {
      const { container } = render(
        <BentoGrid pattern="default">
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("grid-cols-1")
    })

    it("should apply feature pattern", () => {
      const { container } = render(
        <BentoGrid pattern="feature">
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("md:grid-cols-2")
    })

    it("should apply asymmetric pattern", () => {
      const { container } = render(
        <BentoGrid pattern="asymmetric">
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("lg:grid-cols-3")
    })
  })

  describe("customization", () => {
    it("should accept custom gap", () => {
      const { container } = render(
        <BentoGrid gap={8}>
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("gap-8")
    })

    it("should accept custom className", () => {
      const { container } = render(
        <BentoGrid className="custom-class">
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("custom-class")
    })
  })

  describe("responsiveness", () => {
    it("should have responsive columns for default pattern", () => {
      const { container } = render(
        <BentoGrid pattern="default">
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("grid-cols-1")
      expect(grid).toHaveClass("md:grid-cols-2")
      expect(grid).toHaveClass("lg:grid-cols-3")
    })

    it("should be mobile-first", () => {
      const { container } = render(
        <BentoGrid>
          <div>Item</div>
        </BentoGrid>
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass("grid-cols-1")
    })
  })

  describe("edge cases", () => {
    it("should handle no children", () => {
      const { container } = render(<BentoGrid />)

      const grid = container.firstChild as HTMLElement
      expect(grid).toBeInTheDocument()
      expect(grid.children.length).toBe(0)
    })

    it("should handle single child", () => {
      render(
        <BentoGrid>
          <div>Single Item</div>
        </BentoGrid>
      )

      expect(screen.getByText("Single Item")).toBeInTheDocument()
    })

    it("should handle many children", () => {
      render(
        <BentoGrid>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </BentoGrid>
      )

      expect(screen.getByText("Item 0")).toBeInTheDocument()
      expect(screen.getByText("Item 9")).toBeInTheDocument()
    })
  })
})
