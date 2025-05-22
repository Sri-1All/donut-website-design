"use client"

import { useEffect, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { DonutCanvas } from "@/components/custom-donut-images"

export function ParallaxBackground() {
  const [donuts, setDonuts] = useState([])
  const { scrollY } = useScroll()
  const [transforms, setTransforms] = useState({})

  // Generate random donuts for the background
  useEffect(() => {
    const donutTypes = ["strawberry", "chocolate", "blueberry", "vanilla", "maple", "matcha"]
    const newDonuts = []

    // Create 12 random donuts
    for (let i = 0; i < 12; i++) {
      const type = donutTypes[Math.floor(Math.random() * donutTypes.length)]
      const x = Math.random() * 100
      const yPos = Math.random() * 100
      const size = Math.random() * 60 + 40
      const speed = Math.random() * 0.5 + 0.2
      const rotation = Math.random() * 360
      const rotationSpeed = (Math.random() - 0.5) * 20

      newDonuts.push({
        id: i,
        type: type,
        x: x,
        y: yPos,
        size: size,
        speed: speed,
        rotation: rotation,
        rotationSpeed: rotationSpeed,
      })
    }

    setDonuts(newDonuts)
  }, [])

  useEffect(() => {
    const newTransforms = {}
    donuts.forEach((donut) => {
      newTransforms[donut.id] = scrollY.on((value) => {
        return value * donut.speed
      })
    })
    setTransforms(newTransforms)

    return () => {
      scrollY.clearListeners()
    }
  }, [donuts, scrollY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {donuts.map((donut) => {
        return (
          <motion.div
            key={donut.id}
            className="absolute opacity-20"
            style={{
              left: `${donut.x}%`,
              top: `${donut.y}%`,
              width: `${donut.size}px`,
              height: `${donut.size}px`,
              y: scrollY.get() * donut.speed,
            }}
            animate={{
              rotate: donut.rotation + donut.rotationSpeed * 10,
            }}
            transition={{
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 20 - Math.abs(donut.rotationSpeed),
                ease: "linear",
              },
            }}
          >
            <DonutCanvas color={donut.type} className="w-full h-full" />
          </motion.div>
        )
      })}
    </div>
  )
}
