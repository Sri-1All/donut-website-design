"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"

// Define the prizes
const prizes = [
  { id: 1, name: "10% OFF", color: "#FF69B4", textColor: "#FFFFFF" },
  { id: 2, name: "Free Donut", color: "#4682B4", textColor: "#FFFFFF" },
  { id: 3, name: "15% OFF", color: "#9ACD32", textColor: "#000000" },
  { id: 4, name: "Try Again", color: "#F5DEB3", textColor: "#000000" },
  { id: 5, name: "BOGO Deal", color: "#CD853F", textColor: "#FFFFFF" },
  { id: 6, name: "Free Coffee", color: "#8B4513", textColor: "#FFFFFF" },
  { id: 7, name: "20% OFF", color: "#FF5252", textColor: "#FFFFFF" },
  { id: 8, name: "Try Again", color: "#F5DEB3", textColor: "#000000" },
]

export function DonutWheel({ onClose }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState(null)
  const { toast } = useToast()
  const wheelRef = useRef(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    // Determine a random prize
    const winningIndex = Math.floor(Math.random() * prizes.length)
    const prize = prizes[winningIndex]

    // Calculate the rotation needed to land on this prize
    // Each segment is 360/8 = 45 degrees
    // We need to rotate to the middle of the segment
    // The pointer is at the top (270 degrees in standard position)
    const segmentSize = 360 / prizes.length
    const segmentMiddle = winningIndex * segmentSize + segmentSize / 2

    // Calculate the rotation to make the winning segment land at the top
    // We add extra full rotations (1080 = 3 full spins) for effect
    const targetRotation = 1080 + (270 - segmentMiddle)

    // Set the new rotation
    setRotation(targetRotation)

    // Show the result after the animation completes
    setTimeout(() => {
      setWinner(prize)

      // Show confetti for good prizes
      if (prize.name !== "Try Again") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      // Show toast with the result
      toast({
        title: prize.name === "Try Again" ? "Better luck next time!" : "Congratulations!",
        description:
          prize.name === "Try Again"
            ? "Spin again tomorrow for another chance to win!"
            : `You won: ${prize.name}! Check your rewards in your account.`,
        variant: prize.name === "Try Again" ? "default" : "success",
      })

      // Reset spinning state after animation completes
      setTimeout(() => {
        setIsSpinning(false)
      }, 1000)
    }, 5000) // Wait for the animation to complete
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600">Spin & Win</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600">Spin the wheel for a chance to win delicious prizes!</p>
        </div>

        <div className="relative mx-auto w-64 h-64 mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-pink-500"></div>
          </div>

          {/* Wheel */}
          <motion.div
            ref={wheelRef}
            className="w-full h-full rounded-full overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: "easeOut" }}
            style={{ transformOrigin: "center center" }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200">
              {/* Border circle */}
              <circle cx="100" cy="100" r="100" fill="#FFC0CB" />

              {/* Wheel segments */}
              {prizes.map((prize, index) => {
                // Each segment is 45 degrees (360/8)
                const angle = index * 45
                const nextAngle = (index + 1) * 45

                // Calculate points for the segment path
                const rad1 = (angle * Math.PI) / 180
                const rad2 = (nextAngle * Math.PI) / 180

                const x1 = 100 + 100 * Math.cos(rad1)
                const y1 = 100 + 100 * Math.sin(rad1)
                const x2 = 100 + 100 * Math.cos(rad2)
                const y2 = 100 + 100 * Math.sin(rad2)

                // Create path for segment
                const path = `M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`

                // Calculate position for text
                // Position text in the middle of the segment at a consistent distance from center
                const midAngle = ((angle + nextAngle) / 2) * (Math.PI / 180)
                const textDistance = 60 // Distance from center
                const textX = 100 + textDistance * Math.cos(midAngle)
                const textY = 100 + textDistance * Math.sin(midAngle)

                return (
                  <g key={prize.id}>
                    <path d={path} fill={prize.color} stroke="#FFFFFF" strokeWidth="1" />
                    <g transform={`translate(${textX}, ${textY})`}>
                      <text
                        transform={`rotate(${angle + 22.5})`}
                        fill={prize.textColor}
                        fontWeight="bold"
                        fontSize="10"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {prize.name}
                      </text>
                    </g>
                  </g>
                )
              })}

              {/* Center circle */}
              <circle cx="100" cy="100" r="15" fill="#FFFFFF" stroke="#FFC0CB" strokeWidth="2" />

              {/* Center logo */}
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#FF69B4">
                🍩
              </text>
            </svg>
          </motion.div>
        </div>

        <div className="text-center">
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full"
          >
            {isSpinning ? "Spinning..." : "SPIN"}
          </Button>
        </div>

        {winner && (
          <div className="mt-4 text-center p-3 bg-pink-50 rounded-lg border border-pink-200">
            <p className="font-medium text-lg">You won: {winner.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}
