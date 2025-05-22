"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DonutLogo } from "@/components/donut-logo"

export function Header() {
  const pathname = usePathname()

  // Function to handle navigation to home
  const navigateHome = (e) => {
    if (pathname === "/" && window.location.hash) {
      e.preventDefault()
      window.history.pushState({}, "", "/")
      window.scrollTo(0, 0)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/" onClick={navigateHome}>
            <DonutLogo className="h-12 w-12" />
          </Link>
          <Link href="/" onClick={navigateHome}>
            <span className="text-2xl font-bold text-pink-500">Delicious Donuts</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            onClick={navigateHome}
            className={`text-sm font-medium ${pathname === "/" ? "text-pink-500" : "hover:text-pink-500"}`}
          >
            Home
          </Link>
          <Link
            href="/build-your-donut"
            className={`text-sm font-medium ${
              pathname === "/build-your-donut" ? "text-pink-500" : "hover:text-pink-500"
            }`}
          >
            Build Your Own
          </Link>
          <Link href="/#menu" className="text-sm font-medium transition-colors hover:text-pink-500">
            Menu
          </Link>
          <Link href="/#about" className="text-sm font-medium transition-colors hover:text-pink-500">
            About
          </Link>
          <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-pink-500">
            Contact
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-pink-300 hover:bg-pink-50 hover:text-pink-600">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
