"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DonutCarousel from "@/components/donut-carousel"
import { DonutLogo } from "@/components/donut-logo"
import { DonutWheel } from "@/components/gamification/donut-wheel"
import { FallingDonutsGame } from "@/components/gamification/falling-donuts-game"
import { LoyaltyCard } from "@/components/loyalty/loyalty-card"
import { SeasonalTheme } from "@/components/seasonal/seasonal-theme"
import { Header } from "@/components/ui/header"
import { motion } from "framer-motion"

export default function Home() {
  const [showDonutWheel, setShowDonutWheel] = useState(false)
  const [showDonutGame, setShowDonutGame] = useState(false)
  const [showLoyaltyCard, setShowLoyaltyCard] = useState(false)
  const [showSeasonalTheme, setShowSeasonalTheme] = useState(false)
  const [currentSeason, setCurrentSeason] = useState("halloween") // Default season
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [weatherSuggestion, setWeatherSuggestion] = useState(null)
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

  // Check if it's the user's first visit to show seasonal theme
  useEffect(() => {
    const hasSeenSeasonal = localStorage.getItem("hasSeenSeasonal")
    if (!hasSeenSeasonal) {
      const timer = setTimeout(() => {
        setShowSeasonalTheme(true)
        localStorage.setItem("hasSeenSeasonal", "true")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Simulate weather-based suggestions
  useEffect(() => {
    // In a real app, you would use a weather API
    const weather = ["cold", "hot", "rainy"][Math.floor(Math.random() * 3)]

    if (weather === "cold") {
      setWeatherSuggestion({
        text: "It's chilly outside! How about a Hot Chocolate Donut?",
        donut: "Hot Chocolate",
      })
    } else if (weather === "hot") {
      setWeatherSuggestion({
        text: "Beat the heat with our Lemon Sorbet Donut!",
        donut: "Lemon Sorbet",
      })
    } else {
      setWeatherSuggestion({
        text: "Perfect day for our Cozy Cinnamon Donut!",
        donut: "Cozy Cinnamon",
      })
    }
  }, [])

  // Determine current season based on date
  useEffect(() => {
    const now = new Date()
    const month = now.getMonth()

    if (month === 9 || month === 10) {
      // October-November
      setCurrentSeason("halloween")
    } else if (month === 11 || month === 0) {
      // December-January
      setCurrentSeason("christmas")
    } else if (month === 1) {
      // February
      setCurrentSeason("valentine")
    } else if (month === 2 || month === 3) {
      // March-April
      setCurrentSeason("easter")
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col relative">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-pink-600">
                  Sweet, Fluffy, Delicious
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Handcrafted donuts made fresh daily. Taste the difference in every bite.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-x-4"
              >
                <Link href="#menu">
                  <Button className="bg-pink-500 hover:bg-pink-600">View Menu</Button>
                </Link>
                <Link href="/build-your-donut">
                  <Button variant="outline" className="border-pink-300 hover:bg-pink-50 hover:text-pink-600">
                    Build Your Own
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gamification and Seasonal Features */}
        <section className="w-full py-8 bg-white border-t border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDonutWheel(true)}
                className="bg-gradient-to-r from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 p-4 rounded-lg text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-3 rounded-full">🎡</div>
                  <div>
                    <h3 className="font-bold text-pink-600">Spin & Win</h3>
                    <p className="text-sm text-gray-600">Spin the wheel for daily prizes!</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLoyaltyCard(true)}
                className="bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 p-4 rounded-lg text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 text-white p-3 rounded-full">🏆</div>
                  <div>
                    <h3 className="font-bold text-purple-600">Loyalty Rewards</h3>
                    <p className="text-sm text-gray-600">You have {loyaltyPoints} points</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDonutGame(true)}
                className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-4 rounded-lg text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white p-3 rounded-full">🎮</div>
                  <div>
                    <h3 className="font-bold text-blue-600">Play & Earn</h3>
                    <p className="text-sm text-gray-600">Catch donuts to win rewards!</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </section>

        {/* Weather-based suggestion */}
        {weatherSuggestion && (
          <section className="w-full py-6 bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">☀️</div>
                  <p className="text-amber-800">{weatherSuggestion.text}</p>
                </div>
                <Link href="/cart">
                  <Button className="bg-amber-500 hover:bg-amber-600">Try {weatherSuggestion.donut}</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <DonutCarousel />
          </div>
        </section>

        <section id="menu" className="w-full py-12 md:py-24 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-600">Our Menu</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Explore our delicious selection of handcrafted donuts
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DonutCard
                title="Strawberry Delight"
                description="Sweet strawberry glaze with sprinkles"
                image="https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-pink-100"
                hoverColor="hover:bg-pink-200"
                textColor="text-pink-600"
              />
              <DonutCard
                title="Chocolate Dream"
                description="Rich chocolate glaze with chocolate chips"
                image="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-amber-100"
                hoverColor="hover:bg-amber-200"
                textColor="text-amber-800"
              />
              <DonutCard
                title="Blueberry Bliss"
                description="Tangy blueberry glaze with white chocolate drizzle"
                image="https://images.unsplash.com/photo-1556913396-7a3c459ef68e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-blue-100"
                hoverColor="hover:bg-blue-200"
                textColor="text-blue-600"
              />
              <DonutCard
                title="Vanilla Cream"
                description="Classic vanilla glaze with cream filling"
                image="https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-yellow-50"
                hoverColor="hover:bg-yellow-100"
                textColor="text-yellow-600"
              />
              <DonutCard
                title="Maple Bacon"
                description="Sweet maple glaze topped with crispy bacon bits"
                image="https://images.unsplash.com/photo-1527904324834-3bda86da6771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-amber-50"
                hoverColor="hover:bg-amber-100"
                textColor="text-amber-600"
              />
              <DonutCard
                title="Matcha Green Tea"
                description="Earthy matcha glaze with white chocolate drizzle"
                image="https://images.unsplash.com/photo-1631397833242-fc6213046352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                color="bg-green-100"
                hoverColor="hover:bg-green-200"
                textColor="text-green-600"
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-600">Our Story</h2>
                <p className="text-gray-500 md:text-xl">
                  Delicious Donuts started as a small family bakery in 2010. Our passion for creating the perfect donut
                  has led us to experiment with unique flavors and techniques.
                </p>
                <p className="text-gray-500 md:text-xl">
                  Today, we're proud to serve our community with freshly made donuts every day. Each donut is
                  handcrafted with love and the finest ingredients.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl">
                  <img
                    alt="Donut shop interior"
                    className="object-cover w-full h-auto"
                    src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pink-600">Visit Us</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Stop by our shop or order online for pickup and delivery
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-pink-600">Visit Us</h3>
                <p className="text-gray-500">123 Donut Street, Sweetville, CA 90210</p>
                <h3 className="text-xl font-bold text-pink-600">Hours</h3>
                <p className="text-gray-500">Monday - Friday: 7am - 7pm</p>
                <p className="text-gray-500">Saturday - Sunday: 8am - 8pm</p>
                <h3 className="text-xl font-bold text-pink-600">Contact</h3>
                <p className="text-gray-500">Phone: (555) 123-4567</p>
                <p className="text-gray-500">Email: hello@deliciousdonuts.com</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md h-64 overflow-hidden rounded-xl">
                  <img
                    alt="Colorful donuts"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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

      {/* Gamification and Seasonal Modals */}
      {showDonutWheel && <DonutWheel onClose={() => setShowDonutWheel(false)} />}
      {showDonutGame && <FallingDonutsGame onClose={() => setShowDonutGame(false)} />}
      {showLoyaltyCard && <LoyaltyCard onClose={() => setShowLoyaltyCard(false)} />}
      {showSeasonalTheme && <SeasonalTheme currentTheme={currentSeason} onClose={() => setShowSeasonalTheme(false)} />}
    </div>
  )
}

function DonutCard({ title, description, image, color, hoverColor, textColor }) {
  return (
    <Link href={`/cart?donut=${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`rounded-xl ${color} ${hoverColor} p-6 transition-all duration-300 transform hover:shadow-lg`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-40 h-40 overflow-hidden rounded-full">
            <img
              alt={title}
              className="object-cover w-full h-full"
              src={image || "/placeholder.svg"}
              crossOrigin="anonymous"
            />
          </div>
          <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </motion.div>
    </Link>
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
