"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function FallingDonutsGame({ onClose }) {
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [donuts, setDonuts] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [basketPosition, setBasketPosition] = useState(50) // Basket position in %
  const gameAreaRef = useRef(null)
  const { toast } = useToast()
  const intervalRef = useRef(null)
  const timerRef = useRef(null)

  // Start the game
  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    setDonuts([])
    setGameOver(false)
    setBasketPosition(50)

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Start spawning donuts
    intervalRef.current = setInterval(() => {
      if (gameAreaRef.current) {
        const width = gameAreaRef.current.clientWidth

        setDonuts((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * (width - 60),
            y: 0,
            type: Math.floor(Math.random() * 6),
            speed: Math.random() * 3 + 2,
          },
        ])
      }
    }, 1000)
  }

  // End the game
  const endGame = () => {
    setGameActive(false)
    setGameOver(true)
    clearInterval(intervalRef.current)
    clearInterval(timerRef.current)

    // Show results
    toast({
      title: "Game Over!",
      description: `You caught ${score} donuts!`,
    })
  }

  // Update donut positions and check for collisions
  useEffect(() => {
    if (!gameActive) return

    const gameLoop = setInterval(() => {
      if (!gameAreaRef.current) return

      const height = gameAreaRef.current.clientHeight
      const width = gameAreaRef.current.clientWidth
      const basketTop = height - 40
      const basketWidth = 80
      const basketLeft = (basketPosition / 100) * width - basketWidth / 2
      const basketRight = basketLeft + basketWidth

      setDonuts((prev) => {
        const updatedDonuts = prev
          .map((donut) => {
            // Move donut down
            const newY = donut.y + donut.speed

            // Check if donut is caught by basket
            const donutBottom = newY + 60
            const donutLeft = donut.x
            const donutRight = donut.x + 60

            if (
              donutBottom >= basketTop &&
              donutBottom <= basketTop + 20 &&
              donutRight > basketLeft &&
              donutLeft < basketRight
            ) {
              // Donut is caught
              setScore((s) => s + 1)
              return null // Remove this donut
            }

            // Remove if off screen
            if (newY > height) {
              return null
            }

            return { ...donut, y: newY }
          })
          .filter(Boolean) // Remove null entries

        return updatedDonuts
      })
    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameActive, basketPosition])

  // Handle mouse/touch move to control the basket
  const handlePointerMove = (e) => {
    if (!gameActive || !gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()

    // Get pointer position
    let pointerX
    if (e.type === "touchmove") {
      e.preventDefault()
      pointerX = e.touches[0].clientX - rect.left
    } else {
      pointerX = e.clientX - rect.left
    }

    // Calculate position as percentage
    const positionPercent = (pointerX / rect.width) * 100

    // Clamp position
    const clampedPosition = Math.max(10, Math.min(90, positionPercent))
    setBasketPosition(clampedPosition)
  }

  // Add event listeners for pointer movement
  useEffect(() => {
    if (gameActive && gameAreaRef.current) {
      const gameArea = gameAreaRef.current

      const handleTouchMove = (e) => {
        e.preventDefault() // Prevent scrolling
        handlePointerMove(e)
      }

      gameArea.addEventListener("mousemove", handlePointerMove)
      gameArea.addEventListener("touchmove", handleTouchMove, { passive: false })

      return () => {
        gameArea.removeEventListener("mousemove", handlePointerMove)
        gameArea.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [gameActive])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearInterval(timerRef.current)
    }
  }, [])

  // Donut colors
  const donutColors = [
    "#FF69B4", // Strawberry
    "#8B4513", // Chocolate
    "#4682B4", // Blueberry
    "#F5DEB3", // Vanilla
    "#CD853F", // Maple
    "#9ACD32", // Matcha
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600">Catch the Donuts!</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="text-center mb-4">
          <div className="flex justify-between mb-2">
            <div className="font-bold">Score: {score}</div>
            <div className="font-bold">Time: {timeLeft}s</div>
          </div>

          {!gameActive && !gameOver && (
            <p className="text-gray-600 mb-4">Move your cursor to catch falling donuts with the basket!</p>
          )}

          {gameOver && (
            <div className="mb-4">
              <h3 className="text-xl font-bold">Game Over!</h3>
              <p className="text-gray-600">You caught {score} donuts!</p>
            </div>
          )}
        </div>

        <div
          ref={gameAreaRef}
          className="relative w-full h-64 bg-pink-50 rounded-lg overflow-hidden mb-4 border border-pink-200"
          style={{ touchAction: "none" }}
        >
          {/* Falling Donuts */}
          {donuts.map((donut) => (
            <div
              key={donut.id}
              className="absolute"
              style={{
                left: `${donut.x}px`,
                top: `${donut.y}px`,
                width: "60px",
                height: "60px",
              }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" fill={donutColors[donut.type]} />
                <circle cx="30" cy="30" r="8" fill="#FFFFFF" />
                <rect x="18" y="18" width="10" height="3" fill="#FF5252" transform="rotate(45, 21, 19)" />
                <rect x="36" y="24" width="10" height="3" fill="#FFEB3B" transform="rotate(-30, 39, 25)" />
                <rect x="27" y="42" width="10" height="3" fill="#2196F3" transform="rotate(60, 30, 43)" />
                <rect x="15" y="33" width="10" height="3" fill="#9C27B0" transform="rotate(-10, 18, 34)" />
                <rect x="39" y="39" width="10" height="3" fill="#4CAF50" transform="rotate(20, 42, 40)" />
              </svg>
            </div>
          ))}

          {/* Basket to catch donuts */}
          {gameActive && (
            <div
              className="absolute bottom-0 z-20"
              style={{
                left: `${basketPosition}%`,
                transform: "translateX(-50%)",
                width: "80px",
                height: "40px",
              }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40">
                <path d="M 5,40 L 0,20 L 80,20 L 75,40 Z" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
                <path d="M 20,20 C 20,10 60,10 60,20" fill="none" stroke="#8B4513" strokeWidth="2" />
              </svg>
            </div>
          )}

          {!gameActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              {gameOver ? (
                <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600">
                  Play Again
                </Button>
              ) : (
                <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600">
                  Start Game
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          {gameActive ? "Move your cursor to control the basket" : "Click Start to play"}
        </div>
      </div>
    </div>
  )
}
