"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DonutLogo } from "@/components/donut-logo"
import { DonutPreview } from "@/components/donut-builder/donut-preview"
import { DonutCustomizer } from "@/components/donut-builder/donut-customizer"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/ui/header"

// Define the donut customization options
export const donutBases = [
  { id: "plain", name: "Plain", color: "#F5DEB3" },
  { id: "chocolate", name: "Chocolate", color: "#8B4513" },
  { id: "vanilla", name: "Vanilla", color: "#F8EFD4" },
  { id: "redVelvet", name: "Red Velvet", color: "#A52A2A" },
]

export const frostingColors = [
  { id: "pink", name: "Strawberry", color: "#FF69B4" },
  { id: "chocolate", name: "Chocolate", color: "#4A2511" },
  { id: "vanilla", name: "Vanilla", color: "#FFF8DC" },
  { id: "blueberry", name: "Blueberry", color: "#4682B4" },
  { id: "matcha", name: "Matcha", color: "#9ACD32" },
  { id: "maple", name: "Maple", color: "#CD853F" },
]

export const toppings = [
  { id: "sprinkles", name: "Rainbow Sprinkles", icon: "🌈" },
  { id: "chocolateChips", name: "Chocolate Chips", icon: "🍫" },
  { id: "nuts", name: "Chopped Nuts", icon: "🥜" },
  { id: "coconut", name: "Coconut Flakes", icon: "🥥" },
  { id: "oreo", name: "Oreo Crumbs", icon: "🍪" },
  { id: "fruityPebbles", name: "Fruity Pebbles", icon: "🍓" },
  { id: "bacon", name: "Bacon Bits", icon: "🥓" },
  { id: "marshmallow", name: "Mini Marshmallows", icon: "☁️" },
]

export default function BuildYourDonutPage() {
  const { toast } = useToast()
  const [donutBase, setDonutBase] = useState(donutBases[0])
  const [frosting, setFrosting] = useState(frostingColors[0])
  const [selectedToppings, setSelectedToppings] = useState([])
  const [savedDonuts, setSavedDonuts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("base")
  const [backgroundDonuts, setBackgroundDonuts] = useState([])

  // Generate background donuts
  useEffect(() => {
    const donutTypes = ["strawberry", "chocolate", "blueberry", "vanilla", "maple", "matcha"]
    const newDonuts = []

    // Create 12 random donuts
    for (let i = 0; i < 12; i++) {
      const type = donutTypes[Math.floor(Math.random() * donutTypes.length)]
      const x = Math.random() * 100
      const yPos = Math.random() * 100
      const size = Math.random() * 60 + 40
      const rotation = Math.random() * 360
      const rotationSpeed = (Math.random() - 0.5) * 20

      newDonuts.push({
        id: i,
        type: type,
        x: x,
        y: yPos,
        size: size,
        rotation: rotation,
        rotationSpeed: rotationSpeed,
      })
    }

    setBackgroundDonuts(newDonuts)
  }, [])

  // Load saved donuts from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedDonuts")
    if (saved) {
      try {
        setSavedDonuts(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved donuts", e)
      }
    }
  }, [])

  // Toggle a topping selection
  const toggleTopping = (topping) => {
    setSelectedToppings((prev) => {
      if (prev.some((t) => t.id === topping.id)) {
        return prev.filter((t) => t.id !== topping.id)
      } else {
        // Limit to 3 toppings
        if (prev.length >= 3) {
          toast({
            title: "Maximum 3 toppings",
            description: "You can only select up to 3 toppings for your donut.",
            variant: "destructive",
          })
          return prev
        }
        return [...prev, topping]
      }
    })
  }

  // Save the current donut configuration
  const saveDonut = () => {
    setIsLoading(true)

    // Create a new donut object
    const newDonut = {
      id: Date.now(),
      base: donutBase,
      frosting: frosting,
      toppings: selectedToppings,
      date: new Date().toISOString(),
    }

    // Add to saved donuts
    const updatedDonuts = [...savedDonuts, newDonut]
    setSavedDonuts(updatedDonuts)

    // Save to localStorage
    localStorage.setItem("savedDonuts", JSON.stringify(updatedDonuts))

    // Show success message
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Donut saved!",
        description: "Your custom donut has been saved to your collection.",
      })
    }, 800)
  }

  // Add the current donut to cart
  const addToCart = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      window.location.href = `/cart?donut=${donutBase.name}-${frosting.name}`
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Rotating Donuts */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-pink-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundDonuts.map((donut) => (
            <motion.div
              key={donut.id}
              className="absolute opacity-20"
              style={{
                left: `${donut.x}%`,
                top: `${donut.y}%`,
                width: `${donut.size}px`,
                height: `${donut.size}px`,
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
              <BackgroundDonut type={donut.type} />
            </motion.div>
          ))}
        </div>
      </div>

      <Header />

      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">Build Your Own Donut</h1>
          <p className="text-center text-gray-600 mb-8">Customize every detail and create your perfect donut treat!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Donut Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Creation</h2>
            <div className="aspect-square relative">
              <DonutPreview base={donutBase} frosting={frosting} toppings={selectedToppings} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                onClick={saveDonut}
                variant="outline"
                className="border-pink-300 hover:bg-pink-50 hover:text-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Creation"}
              </Button>
              <Button onClick={addToCart} className="bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add to Cart - $3.99"}
              </Button>
            </div>
          </div>

          {/* Customization Options */}
          <DonutCustomizer
            donutBase={donutBase}
            setDonutBase={setDonutBase}
            frosting={frosting}
            setFrosting={setFrosting}
            selectedToppings={selectedToppings}
            toggleTopping={toggleTopping}
            donutBases={donutBases}
            frostingColors={frostingColors}
            toppings={toppings}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Saved Creations */}
        {savedDonuts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Your Saved Creations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedDonuts.map((donut) => (
                <motion.div
                  key={donut.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 relative mb-3">
                    <DonutPreview base={donut.base} frosting={donut.frosting} toppings={donut.toppings} small />
                  </div>
                  <h3 className="font-medium text-gray-800">
                    {donut.frosting.name} {donut.base.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {donut.toppings.length > 0 ? `With ${donut.toppings.map((t) => t.name).join(", ")}` : "No toppings"}
                  </p>
                  <div className="mt-3 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setDonutBase(donut.base)
                        setFrosting(donut.frosting)
                        setSelectedToppings(donut.toppings)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                          setIsLoading(false)
                          toast({
                            title: "Added to cart!",
                            description: "Your saved donut has been added to your cart.",
                          })
                          window.location.href = `/cart?donut=${donut.base.name}-${donut.frosting.name}`
                        }, 800)
                      }}
                    >
                      Order
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <DonutLogo className="h-6 w-6" />
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Delicious Donuts. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-pink-500">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-pink-500">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Background donut with sprinkles but no spikes
function BackgroundDonut({ type }) {
  const getDonutColor = () => {
    switch (type) {
      case "chocolate":
        return "#8B4513"
      case "blueberry":
        return "#4682B4"
      case "strawberry":
        return "#FF69B4"
      case "vanilla":
        return "#F5DEB3"
      case "maple":
        return "#CD853F"
      case "matcha":
        return "#9ACD32"
      default:
        return "#FFB6C1"
    }
  }

  const getToppingColor = () => {
    switch (type) {
      case "chocolate":
        return "#4A2511"
      case "blueberry":
        return "#1E3F66"
      case "strawberry":
        return "#FF69B4"
      case "vanilla":
        return "#DAA520"
      case "maple":
        return "#8B4513"
      case "matcha":
        return "#556B2F"
      default:
        return "#FF69B4"
    }
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {/* Donut base */}
      <circle cx="50" cy="50" r="40" fill={getDonutColor()} />

      {/* Donut hole */}
      <circle cx="50" cy="50" r="15" fill="#FFFFFF" />

      {/* Sprinkles */}
      <g>
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2
          const distance = 15 + Math.random() * 25
          const x = 50 + Math.cos(angle) * distance
          const y = 50 + Math.sin(angle) * distance
          const length = 5
          const sprinkleAngle = Math.random() * Math.PI * 2
          const colors = ["#FF5252", "#FFEB3B", "#2196F3", "#4CAF50", "#9C27B0", "#FF9800"]
          const color = colors[Math.floor(Math.random() * colors.length)]

          return (
            <line
              key={i}
              x1={x - Math.cos(sprinkleAngle) * length}
              y1={y - Math.sin(sprinkleAngle) * length}
              x2={x + Math.cos(sprinkleAngle) * length}
              y2={y + Math.sin(sprinkleAngle) * length}
              stroke={color}
              strokeWidth="2"
            />
          )
        })}
      </g>

      {/* Highlight */}
      <circle cx="40" cy="40" r="5" fill="rgba(255, 255, 255, 0.6)" />
    </svg>
  )
}
