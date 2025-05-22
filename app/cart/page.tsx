"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DonutLogo } from "@/components/donut-logo"
import { Trash2, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "@/components/ui/header"

export default function CartPage() {
  const searchParams = useSearchParams()
  const donutParam = searchParams.get("donut")

  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Add the donut from URL params to cart if it exists
  useEffect(() => {
    if (donutParam) {
      const parts = donutParam.split("-")
      if (parts.length >= 2) {
        const base = parts[0]
        const frosting = parts[1]

        // Check if this donut is already in the cart
        const existingItemIndex = cartItems.findIndex((item) => item.base === base && item.frosting === frosting)

        if (existingItemIndex >= 0) {
          // Increment quantity if already in cart
          const newCartItems = [...cartItems]
          newCartItems[existingItemIndex].quantity += 1
          setCartItems(newCartItems)
        } else {
          // Add new item to cart
          setCartItems((prev) => [
            ...prev,
            {
              id: Date.now(),
              base,
              frosting,
              quantity: 1,
              price: 3.99,
            },
          ])
        }
      }
    }
  }, [donutParam])

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Checkout function
  const checkout = () => {
    setIsLoading(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false)
      setCartItems([])
      alert("Thank you for your order! Your delicious donuts will be ready soon.")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">Your Cart</h1>
          <p className="text-center text-gray-600 mb-8">Review your delicious selections before checkout</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍩</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious donuts to get started!</p>
            <Link href="/build-your-donut">
              <Button className="bg-pink-500 hover:bg-pink-600">Build Your Own Donut</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Item</th>
                    <th className="text-center pb-4">Quantity</th>
                    <th className="text-right pb-4">Price</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl mr-3">
                            🍩
                          </div>
                          <div>
                            <div className="font-medium">
                              {item.frosting} {item.base}
                            </div>
                            <div className="text-sm text-gray-500">Custom Donut</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-gray-500">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span>${(totalPrice * 1.08).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <Link href="/">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={checkout} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </div>
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
