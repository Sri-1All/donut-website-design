"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function DonutPreview({ base, frosting, toppings, small = false }) {
  const canvasRef = useRef(null)

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
    ctx.fillStyle = base.color
    ctx.fill()

    // Draw inner circle (hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()

    // Draw frosting
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.lineWidth = outerRadius * 0.3
    ctx.strokeStyle = frosting.color
    ctx.stroke()

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
    ctx.strokeStyle = frosting.color
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw toppings
    if (toppings.length > 0) {
      // Different topping styles based on selection
      toppings.forEach((topping) => {
        switch (topping.id) {
          case "sprinkles":
            drawSprinkles(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "chocolateChips":
            drawChocolateChips(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "nuts":
            drawNuts(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "coconut":
            drawCoconut(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "oreo":
            drawOreo(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "fruityPebbles":
            drawFruityPebbles(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "bacon":
            drawBacon(ctx, centerX, centerY, innerRadius, outerRadius)
            break
          case "marshmallow":
            drawMarshmallows(ctx, centerX, centerY, innerRadius, outerRadius)
            break
        }
      })
    }

    // Draw highlight
    ctx.beginPath()
    ctx.arc(centerX - outerRadius * 0.3, centerY - outerRadius * 0.3, outerRadius * 0.1, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.fill()
  }, [base, frosting, toppings])

  // Draw sprinkles
  function drawSprinkles(ctx, centerX, centerY, innerRadius, outerRadius) {
    const sprinkleColors = ["#FF5252", "#FFEB3B", "#2196F3", "#4CAF50", "#9C27B0", "#FF9800"]

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

  // Draw chocolate chips
  function drawChocolateChips(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#3A1C00"
      ctx.fill()
    }
  }

  // Draw nuts
  function drawNuts(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.ellipse(x, y, 5, 3, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fillStyle = "#D2B48C"
      ctx.fill()
    }
  }

  // Draw coconut flakes
  function drawCoconut(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.ellipse(x, y, 3, 1, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fillStyle = "#FFFFFF"
      ctx.fill()
      ctx.strokeStyle = "#F5F5F5"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  // Draw oreo crumbs
  function drawOreo(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      const size = Math.random() * 3 + 1

      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = "#2F2F2F"
      ctx.fill()
    }
  }

  // Draw fruity pebbles
  function drawFruityPebbles(ctx, centerX, centerY, innerRadius, outerRadius) {
    const colors = ["#FF5252", "#FFEB3B", "#2196F3", "#4CAF50", "#9C27B0", "#FF9800"]

    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.ellipse(x, y, 2, 1.5, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.fill()
    }
  }

  // Draw bacon bits
  function drawBacon(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.ellipse(x, y, 4, 2, Math.random() * Math.PI, 0, Math.PI * 2)

      // Marbled effect
      const gradient = ctx.createLinearGradient(x - 4, y - 2, x + 4, y + 2)
      gradient.addColorStop(0, "#FF6B6B")
      gradient.addColorStop(0.5, "#FFC0CB")
      gradient.addColorStop(1, "#FF6B6B")

      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  // Draw mini marshmallows
  function drawMarshmallows(ctx, centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)

      // Soft gradient for marshmallow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4)
      gradient.addColorStop(0, "#FFFFFF")
      gradient.addColorStop(1, "#F0F0F0")

      ctx.fillStyle = gradient
      ctx.fill()
      ctx.strokeStyle = "#E0E0E0"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  return (
    <motion.div
      className="w-full h-full"
      animate={{ rotate: small ? 0 : 360 }}
      transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
