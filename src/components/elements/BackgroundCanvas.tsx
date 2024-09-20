import { useEffect, useRef } from "react"

interface BackgroundCanvasProps {
  width: number
  height: number
  colors: string[]
  morphDuration: number // In milliseconds
  noiseLevel?: number // Optional noise level
  onHover?: boolean // Controls the hover effect
}

export function BackgroundCanvas({
  width,
  height,
  colors,
  morphDuration,
  noiseLevel = 0.05,
  onHover = false,
}: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameIdRef = useRef<number | null>(null) // Use ref for the animation frame ID

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    const startTime = Date.now()

    const draw = () => {
      const elapsedTime = Date.now() - startTime
      const t = (elapsedTime % morphDuration) / morphDuration

      // Simple color interpolation between first two colors
      const r = Math.floor(
        (1 - t) * parseInt(colors[0].slice(1, 3), 16) +
          t * parseInt(colors[1].slice(1, 3), 16)
      )
      const g = Math.floor(
        (1 - t) * parseInt(colors[0].slice(3, 5), 16) +
          t * parseInt(colors[1].slice(3, 5), 16)
      )
      const b = Math.floor(
        (1 - t) * parseInt(colors[0].slice(5, 7), 16) +
          t * parseInt(colors[1].slice(5, 7), 16)
      )

      const color = `rgb(${r},${g},${b})`

      // Fill the canvas with the color
      ctx.fillStyle = color
      ctx.fillRect(0, 0, width, height)

      // Add optional noise/grain
      if (noiseLevel > 0) {
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const rand = Math.random() * noiseLevel * 255
          data[i] += rand // Red channel
          data[i + 1] += rand // Green channel
          data[i + 2] += rand // Blue channel
        }
        ctx.putImageData(imageData, 0, 0)
      }

      // Store the animation frame ID in ref
      animationFrameIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [width, height, colors, morphDuration, noiseLevel])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={onHover ? "hovered" : ""}
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  )
}
