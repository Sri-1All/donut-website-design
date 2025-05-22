"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DonutLogo } from "@/components/donut-logo"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function SeasonalSpecialsPage() {
  const { toast } = useToast()
  const [currentSeason, setCurrentSeason] = useState("halloween") // Default season

  // Determine current season based on date
  useState(() => {
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
  })

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
      description:
        "Our special Pumpkin Spice donut is the perfect treat for the spooky season! Made with real pumpkin puree and topped with a cinnamon glaze, this donut will get you in the Halloween spirit.",
      additionalItems: [
        { name: "Pumpkin Spice Coffee", price: 3.99, description: "Coffee with pumpkin spice syrup and whipped cream" },
        {
          name: "Pumpkin Spice Donut Holes",
          price: 4.99,
          description: "Mini pumpkin spice donuts, perfect for sharing",
        },
        {
          name: "Halloween Gift Box",
          price: 19.99,
          description: "Assorted Halloween-themed donuts in a special gift box",
        },
      ],
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
      description:
        "Our Gingerbread donut captures the essence of the holiday season! With warm spices and a sweet glaze, this donut is like Christmas morning in every bite.",
      additionalItems: [
        {
          name: "Peppermint Mocha",
          price: 4.49,
          description: "Coffee with peppermint and chocolate, topped with whipped cream",
        },
        {
          name: "Holiday Sprinkle Donuts",
          price: 3.99,
          description: "Classic donuts with festive red and green sprinkles",
        },
        {
          name: "Christmas Gift Box",
          price: 24.99,
          description: "Assorted Christmas-themed donuts in a special gift box",
        },
      ],
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
      description:
        "Share the love with our Chocolate Heart donut! This heart-shaped treat is filled with raspberry jam and topped with rich chocolate ganache.",
      additionalItems: [
        { name: "Rose Latte", price: 4.99, description: "Coffee with rose syrup and pink whipped cream" },
        { name: "Love Box", price: 12.99, description: "Two heart-shaped donuts and two coffees" },
        {
          name: "Valentine's Gift Box",
          price: 29.99,
          description: "Assorted heart-shaped donuts in a special gift box",
        },
      ],
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
      description:
        "Hop into spring with our Carrot Cake donut! Made with fresh carrots and topped with cream cheese frosting, this donut is a springtime delight.",
      additionalItems: [
        { name: "Lavender Latte", price: 4.49, description: "Coffee with lavender syrup and whipped cream" },
        { name: "Easter Egg Donuts", price: 3.99, description: "Egg-shaped donuts with pastel-colored glazes" },
        { name: "Easter Basket", price: 22.99, description: "Assorted Easter-themed donuts in a basket" },
      ],
    },
  }

  const theme = themes[currentSeason]

  const addToCart = (item) => {
    toast({
      title: "Added to cart!",
      description: `${item} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-2 items-center">
            <DonutLogo className="h-12 w-12" />
            <span className="text-2xl font-bold text-pink-500">Delicious Donuts</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-pink-500">
              Home
            </Link>
            <Link href="/build-your-donut" className="text-sm font-medium transition-colors hover:text-pink-500">
              Build Your Own
            </Link>
            <Link href="#menu" className="text-sm font-medium transition-colors hover:text-pink-500">
              Menu
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-pink-500">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-pink-300 hover:bg-pink-50 hover:text-pink-600">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className={`w-full py-16 bg-gradient-to-br ${theme.colors.background} text-white`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-4">
                <div className="inline-block text-4xl mb-2">{theme.icon}</div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{theme.name} Specials</h1>
                <p className="text-xl opacity-90">Limited time offers for the {theme.name} season!</p>
                <div className="flex gap-4 mt-6">
                  <Button
                    className="bg-white text-black hover:bg-white/90"
                    onClick={() => addToCart(theme.specialDonut + " Donut")}
                  >
                    Order Now
                  </Button>
                  <Link href="#specials">
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      See All Specials
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.div
                  className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center text-8xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {theme.icon}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Donut */}
        <section className="w-full py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative w-full max-w-md mx-auto aspect-square">
                  <div className="absolute inset-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <div className="text-8xl">{theme.icon}</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-pink-600">{theme.specialDonut} Donut</h2>
                <p className="text-gray-600">{theme.description}</p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Price</span>
                    <span className="font-bold">$3.99</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Calories</span>
                    <span>320 kcal</span>
                  </div>
                </div>
                <Button
                  className="bg-pink-500 hover:bg-pink-600 w-full"
                  onClick={() => addToCart(theme.specialDonut + " Donut")}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* More Seasonal Items */}
        <section id="specials" className="w-full py-16 bg-pink-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">More {theme.name} Specials</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {theme.additionalItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div
                    className={`h-40 bg-gradient-to-r ${theme.colors.background} flex items-center justify-center text-4xl`}
                  >
                    {theme.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                      <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => addToCart(item.name)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
    </div>
  )
}
