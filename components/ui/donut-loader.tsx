"use client"

import { useEffect, useRef } from "react"

interface DonutLoaderProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function DonutLoader({ size = "md", color = "#FF69B4" }: DonutLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  // Determine size in pixels
  const getSizeInPixels = () => {
    switch (size) {
      case "sm":
        return 24
      case "lg":
        return 64
      case "md":
      default:
        return 40
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pixelSize = getSizeInPixels()
    canvas.width = pixelSize
    canvas.height = pixelSize

    let fillPercentage = 0
    let increasing = true

    const drawDonut = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const outerRadius = (canvas.width / 2) * 0.8
      const innerRadius = outerRadius * 0.4

      // Draw donut base (outline)
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#F5DEB3" // Donut base color
      ctx.fill()

      // Draw inner circle (hole)
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#FFFFFF"
      ctx.fill()

      // Draw frosting that fills up
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius, -Math.PI / 2, Math.PI * 2 * fillPercentage - Math.PI / 2)
      ctx.lineTo(centerX, centerY)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = 0.8
      ctx.fill()
      ctx.globalAlpha = 1

      // Update fill percentage
      if (increasing) {
        fillPercentage += 0.01
        if (fillPercentage >= 1) {
          increasing = false
        }
      } else {
        fillPercentage -= 0.01
        if (fillPercentage <= 0) {
          increasing = true
        }
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(drawDonut)
    }

    drawDonut()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, size])

  return <canvas ref={canvasRef} width={getSizeInPixels()} height={getSizeInPixels()} className="inline-block" />
}
