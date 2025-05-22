"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Seasonal themes
const themes = {
  halloween: {
    name: "Halloween",
    colors: {
      primary: "#FF6D00",
      secondary: "#4A148C",
      background: "from-orange-900 to-purple-900",
    },
    icon: "🎃",
    particles: "🕸️",
    specialDonut: "Pumpkin Spice",
    endDate: "2023-11-01",
  },
  christmas: {
    name: "Christmas",
    colors: {
      primary: "#D50000",
      secondary: "#1B5E20",
      background: "from-red-700 to-green-800",
    },
    icon: "🎄",
    particles: "❄️",
    specialDonut: "Gingerbread",
    endDate: "2023-12-26",
  },
  valentine: {
    name: "Valentine's Day",
    colors: {
      primary: "#D81B60",
      secondary: "#C2185B",
      background: "from-pink-600 to-red-400",
    },
    icon: "❤️",
    particles: "💕",
    specialDonut: "Chocolate Heart",
    endDate: "2023-02-15",
  },
  easter: {
    name: "Easter",
    colors: {
      primary: "#7CB342",
      secondary: "#8E24AA",
      background: "from-green-400 to-purple-400",
    },
    icon: "🐰",
    particles: "🥚",
    specialDonut: "Carrot Cake",
    endDate: "2023-04-10",
  },
}

export function SeasonalTheme({ currentTheme = "halloween", onClose }) {
  const theme = themes[currentTheme]
  const [timeLeft, setTimeLeft] = useState("")
  const [particles, setParticles] = useState([])
  const { toast } = useToast()

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(theme.endDate) - new Date()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)

        setTimeLeft(`${days}d ${hours}h`)
      } else {
        setTimeLeft("Ended")
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000 * 60) // Update every minute

    return () => clearInterval(timer)
  }, [theme.endDate])

  // Generate particles
  useEffect(() => {
    const newParticles = []

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }

    setParticles(newParticles)
  }, [currentTheme])

  // Add to cart
  const addToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${theme.specialDonut} Donut has been added to your cart.`,
    })
  }

  // Handle Learn More button
  const handleLearnMore = () => {
    toast({
      title: "Seasonal Special",
      description: `Learn more about our ${theme.specialDonut} Donut and other seasonal offerings!`,
    })

    // Navigate to seasonal specials page
    window.location.href = "/seasonal-specials"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`relative overflow-hidden rounded-xl shadow-xl max-w-md w-full bg-gradient-to-br ${theme.colors.background}`}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute text-2xl opacity-30"
                initial={{
                  x: `${particle.x}%`,
                  y: "110%",
                  scale: particle.size / 20,
                }}
                animate={{
                  y: "-10%",
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
              >
                {theme.particles}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="relative z-10 p-6 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {theme.icon} {theme.name} Special
              </h2>
              <p className="opacity-80">Limited time offer! Ends in {timeLeft}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-white" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center text-6xl">
              {theme.icon}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">{theme.specialDonut} Donut</h3>
              <p className="opacity-80 mb-4">
                Our special seasonal treat is here for a limited time only! Don't miss out on this delicious creation.
              </p>
              <div className="flex gap-2">
                <Button className="bg-white text-black hover:bg-white/90" onClick={addToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h4 className="font-bold mb-2">More Seasonal Specials</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>{theme.specialDonut} Coffee</span>
                <span className="font-bold">$3.99</span>
              </li>
              <li className="flex justify-between">
                <span>{theme.specialDonut} Donut Holes</span>
                <span className="font-bold">$4.99</span>
              </li>
              <li className="flex justify-between">
                <span>Seasonal Gift Box</span>
                <span className="font-bold">$19.99</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
