"use client"

import { useEffect, useRef } from "react"

interface DonutCanvasProps {
  color: string
  sprinkles?: boolean
  className?: string
}

export function DonutCanvas({ color, sprinkles = true, className = "w-full h-full" }: DonutCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Colors based on donut type
    let donutColor = "#FFB6C1" // Default pink
    let toppingColor = "#FF69B4"

    switch (color) {
      case "chocolate":
        donutColor = "#8B4513"
        toppingColor = "#4A2511"
        break
      case "blueberry":
        donutColor = "#4682B4"
        toppingColor = "#1E3F66"
        break
      case "strawberry":
        donutColor = "#FFB6C1"
        toppingColor = "#FF69B4"
        break
      case "vanilla":
        donutColor = "#F5DEB3"
        toppingColor = "#DAA520"
        break
      case "maple":
        donutColor = "#CD853F"
        toppingColor = "#8B4513"
        break
      case "matcha":
        donutColor = "#9ACD32"
        toppingColor = "#556B2F"
        break
    }

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw donut
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const outerRadius = Math.min(rect.width, rect.height) * 0.4
    const innerRadius = outerRadius * 0.35

    // Draw outer circle (donut base)
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.fillStyle = donutColor
    ctx.fill()

    // Draw inner circle (hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()

    // Draw icing drips
    ctx.beginPath()
    for (let i = 0; i < 20; i++) {
      const angle = ((Math.PI * 2) / 20) * i
      const x1 = centerX + Math.cos(angle) * (outerRadius - 5)
      const y1 = centerY + Math.sin(angle) * (outerRadius - 5)
      const dripLength = Math.random() * 10 + 5
      const x2 = centerX + Math.cos(angle) * (outerRadius + dripLength)
      const y2 = centerY + Math.sin(angle) * (outerRadius + dripLength)

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }
    ctx.strokeStyle = toppingColor
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw sprinkles if enabled
    if (sprinkles) {
      const sprinkleColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]

      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance
        const sprinkleLength = 5
        const sprinkleAngle = Math.random() * Math.PI * 2

        ctx.beginPath()
        ctx.moveTo(x - Math.cos(sprinkleAngle) * sprinkleLength, y - Math.sin(sprinkleAngle) * sprinkleLength)
        ctx.lineTo(x + Math.cos(sprinkleAngle) * sprinkleLength, y + Math.sin(sprinkleAngle) * sprinkleLength)
        ctx.strokeStyle = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)]
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Draw highlight
    ctx.beginPath()
    ctx.arc(centerX - outerRadius * 0.3, centerY - outerRadius * 0.3, outerRadius * 0.1, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.fill()
  }, [color, sprinkles])

  return <canvas ref={canvasRef} className={className} />
}

export function StrawberryDonut({ className }: { className?: string }) {
  return <DonutCanvas color="strawberry" className={className} />
}

export function ChocolateDonut({ className }: { className?: string }) {
  return <DonutCanvas color="chocolate" className={className} />
}

export function BlueberryDonut({ className }: { className?: string }) {
  return <DonutCanvas color="blueberry" className={className} />
}

export function VanillaDonut({ className }: { className?: string }) {
  return <DonutCanvas color="vanilla" sprinkles={false} className={className} />
}

export function MapleDonut({ className }: { className?: string }) {
  return <DonutCanvas color="maple" sprinkles={false} className={className} />
}

export function MatchaDonut({ className }: { className?: string }) {
  return <DonutCanvas color="matcha" className={className} />
}
