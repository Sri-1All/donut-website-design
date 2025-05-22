"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DonutLogo } from "@/components/donut-logo"
import { Progress } from "@/components/ui/progress"

export function LoyaltyCard({ onClose }) {
  const [points, setPoints] = useState(75) // Example points
  const [isFlipped, setIsFlipped] = useState(false)

  // For demo purposes
  const addPoints = () => {
    setPoints((prev) => Math.min(prev + 10, 100))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Loyalty Rewards</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="perspective-[1000px] w-full h-56 mb-6">
          <motion.div
            className="w-full h-full relative transition-all duration-500 transform-style-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front of card */}
            <div
              className={`absolute inset-0 backface-hidden rounded-xl p-6 bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-lg ${
                isFlipped ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">Donut Rewards</h3>
                  <p className="text-sm opacity-80">Member since Jan 2023</p>
                </div>
                <DonutLogo className="h-12 w-12" />
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Points Balance</span>
                  <span className="text-2xl font-bold">{points}</span>
                </div>
                <Progress value={points} className="h-2 bg-white/30" indicatorClassName="bg-white" />
                <p className="text-xs mt-2 opacity-80">{100 - points} more points until your next free donut!</p>
              </div>

              <div className="absolute bottom-6 right-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsFlipped(true)}
                >
                  View Rewards
                </Button>
              </div>
            </div>

            {/* Back of card */}
            <div
              className={`absolute inset-0 backface-hidden rounded-xl p-6 bg-gradient-to-br from-purple-400 to-pink-600 text-white shadow-lg transform rotate-y-180 ${
                isFlipped ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Available Rewards</h3>

              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>Free Donut</span>
                  <span className="font-bold">100 pts</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Free Coffee</span>
                  <span className="font-bold">75 pts</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>10% Off Order</span>
                  <span className="font-bold">50 pts</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Birthday Special</span>
                  <span className="font-bold">FREE</span>
                </li>
              </ul>

              <div className="absolute bottom-6 right-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsFlipped(false)}
                >
                  View Card
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">Earn points with every purchase and unlock delicious rewards!</p>

          {/* Demo button to add points */}
          <Button onClick={addPoints} className="bg-pink-500 hover:bg-pink-600">
            + Simulate Purchase (10 pts)
          </Button>
        </div>
      </div>
    </div>
  )
}
