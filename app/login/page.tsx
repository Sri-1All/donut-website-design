"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutLogo } from "@/components/donut-logo"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSprinkles, setShowSprinkles] = useState(false)
  const canvasRef = useRef(null)
  const sprinkles = useRef([])
  const animationRef = useRef(null)

  // Sprinkle colors
  const colors = [
    "#FF5252", // Red
    "#FFEB3B", // Yellow
    "#2196F3", // Blue
    "#4CAF50", // Green
    "#9C27B0", // Purple
    "#FF9800", // Orange
    "#E91E63", // Pink
  ]

  // Create sprinkles
  const createSprinkles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = window.innerWidth
    const height = window.innerHeight

    // Set canvas dimensions to match window
    canvas.width = width
    canvas.height = height

    sprinkles.current = []

    // Create 150 sprinkles distributed across the entire width
    for (let i = 0; i < 150; i++) {
      sprinkles.current.push({
        x: Math.random() * width, // Position across full width
        y: -20 - Math.random() * 100, // Start above the canvas
        width: Math.random() * 10 + 5,
        height: Math.random() * 4 + 2,
        speed: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
      })
    }
  }

  // Animate sprinkles
  const animateSprinkles = () => {
    if (!canvasRef.current || !showSprinkles) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw and update each sprinkle
    let allOffScreen = true

    sprinkles.current.forEach((sprinkle) => {
      // Update position
      sprinkle.y += sprinkle.speed

      // Check if any sprinkle is still on screen
      if (sprinkle.y < height) {
        allOffScreen = false
      }

      // Draw sprinkle
      ctx.save()
      ctx.translate(sprinkle.x, sprinkle.y)
      ctx.rotate(sprinkle.rotation)
      ctx.fillStyle = sprinkle.color
      ctx.fillRect(-sprinkle.width / 2, -sprinkle.height / 2, sprinkle.width, sprinkle.height)
      ctx.restore()
    })

    // Stop animation if all sprinkles are off screen
    if (allOffScreen) {
      setShowSprinkles(false)
      return
    }

    // Continue animation
    animationRef.current = requestAnimationFrame(animateSprinkles)
  }

  // Handle window resize
  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight

      // Recreate sprinkles if animation is active
      if (showSprinkles) {
        createSprinkles()
      }
    }
  }

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    // Open Google sign-in in a popup window
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    window.open(
      "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin",
      "Google Sign In",
      `width=${width},height=${height},left=${left},top=${top}`,
    )
  }

  // Handle Facebook Sign-In
  const handleFacebookSignIn = () => {
    // Open Facebook sign-in in a popup window
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    window.open(
      "https://www.facebook.com/login.php",
      "Facebook Sign In",
      `width=${width},height=${height},left=${left},top=${top}`,
    )
  }

  // Set up canvas when component mounts
  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Start animation when showSprinkles changes
  useEffect(() => {
    if (showSprinkles) {
      createSprinkles()
      animateSprinkles()
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [showSprinkles])

  function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading and then show sprinkles
    setTimeout(() => {
      setIsLoading(false)
      setShowSprinkles(true)

      // Redirect to home page after animation starts - faster redirect
      setTimeout(() => {
        window.location.href = "/"
      }, 500) // Reduced from 1000ms to 500ms
    }, 800) // Reduced from 1500ms to 800ms
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <Link href="/" className="flex gap-2 items-center">
            <DonutLogo className="h-10 w-10" />
            <span className="text-xl font-bold text-pink-500">Delicious Donuts</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="mx-auto max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <DonutLogo className="h-24 w-24" />
              </motion.div>
            </div>
          </motion.div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-24">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight text-center text-pink-600">
                Welcome Back
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Sign in to your account to order your favorite donuts
              </p>
            </div>
            <div className="p-6 pt-0">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="hello@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-pink-500 hover:text-pink-600">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="hello@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Or continue with</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {/* Google Sign-In Button */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors h-10"
                  onClick={handleGoogleSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5"
                    fill="#4285F4"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </Button>

                {/* Facebook Sign-In Button */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors h-10"
                  onClick={handleFacebookSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5"
                    fill="#1877F2"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Sign in with Facebook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background py-4">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Delicious Donuts. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sprinkles Canvas */}
      {showSprinkles && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
          style={{ width: "100vw", height: "100vh" }}
        />
      )}
    </div>
  )
}
