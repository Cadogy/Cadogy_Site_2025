import { render, screen } from "@/test/utils"
import userEvent from "@testing-library/user-event"
import { BentoCard } from "./BentoCard"

describe("BentoCard", () => {
  describe("rendering", () => {
    it("should render title and description", () => {
      render(
        <BentoCard
          title="Service Title"
          description="Service description text"
          variant="text"
        />
      )

      expect(screen.getByText("Service Title")).toBeInTheDocument()
      expect(screen.getByText("Service description text")).toBeInTheDocument()
    })

    it("should render with image variant", () => {
      render(
        <BentoCard
          title="Service"
          description="Description"
          variant="image"
          image="/test-image.jpg"
        />
      )

      const card = screen.getByText("Service").closest("div")
      expect(card).toBeInTheDocument()
    })

    it("should apply text variant styling", () => {
      const { container } = render(
        <BentoCard title="Title" description="Desc" variant="text" />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("bento-card")
    })

    it("should apply feature variant styling", () => {
      const { container } = render(
        <BentoCard title="Title" description="Desc" variant="feature" />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("md:col-span-2")
    })
  })

  describe("sizes", () => {
    it("should apply small size", () => {
      const { container } = render(
        <BentoCard
          title="Title"
          description="Desc"
          variant="text"
          size="small"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("p-6")
    })

    it("should apply medium size", () => {
      const { container } = render(
        <BentoCard
          title="Title"
          description="Desc"
          variant="text"
          size="medium"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("p-8")
    })

    it("should apply large size", () => {
      const { container } = render(
        <BentoCard
          title="Title"
          description="Desc"
          variant="text"
          size="large"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("p-10")
    })
  })

  describe("interactions", () => {
    it("should handle click events", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <BentoCard
          title="Clickable"
          description="Click me"
          variant="text"
          onClick={handleClick}
        />
      )

      const card = screen.getByText("Clickable").closest("div")
      await user.click(card!)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should apply cursor-pointer when onClick is provided", () => {
      const { container } = render(
        <BentoCard
          title="Title"
          description="Desc"
          variant="text"
          onClick={() => {}}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("cursor-pointer")
    })

    it("should not apply cursor-pointer when onClick is not provided", () => {
      const { container } = render(
        <BentoCard title="Title" description="Desc" variant="text" />
      )

      const card = container.firstChild as HTMLElement
      expect(card).not.toHaveClass("cursor-pointer")
    })
  })

  describe("image handling", () => {
    it("should render background image for image variant", () => {
      render(
        <BentoCard
          title="Title"
          description="Desc"
          variant="image"
          image="/test.jpg"
        />
      )

      const title = screen.getByText("Title")
      expect(title).toBeInTheDocument()
    })

    it("should not require image for text variant", () => {
      render(<BentoCard title="Title" description="Desc" variant="text" />)

      expect(screen.getByText("Title")).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should be visible to screen readers", () => {
      render(
        <BentoCard
          title="Accessible Title"
          description="Accessible description"
          variant="text"
        />
      )

      const title = screen.getByText("Accessible Title")
      const desc = screen.getByText("Accessible description")

      expect(title).toBeVisible()
      expect(desc).toBeVisible()
    })

    it("should have semantic HTML structure", () => {
      render(<BentoCard title="Title" description="Desc" variant="text" />)

      const title = screen.getByText("Title")
      expect(title.tagName).toBe("H3")
    })
  })

  describe("edge cases", () => {
    it("should handle long titles", () => {
      const longTitle = "A".repeat(100)

      render(
        <BentoCard title={longTitle} description="Desc" variant="text" />
      )

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("should handle long descriptions", () => {
      const longDesc = "A".repeat(500)

      render(<BentoCard title="Title" description={longDesc} variant="text" />)

      expect(screen.getByText(longDesc)).toBeInTheDocument()
    })

    it("should handle special characters in text", () => {
      render(
        <BentoCard
          title="Title <>&"
          description="Desc <>&"
          variant="text"
        />
      )

      expect(screen.getByText("Title <>&")).toBeInTheDocument()
      expect(screen.getByText("Desc <>&")).toBeInTheDocument()
    })
  })
})
