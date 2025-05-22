"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function DonutCustomizer({
  donutBase,
  setDonutBase,
  frosting,
  setFrosting,
  selectedToppings,
  toggleTopping,
  donutBases,
  frostingColors,
  toppings,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="frosting">Frosting</TabsTrigger>
          <TabsTrigger value="toppings">Toppings</TabsTrigger>
        </TabsList>

        {/* Base Selection */}
        <TabsContent value="base" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800">Choose your donut base</h3>
          <div className="grid grid-cols-2 gap-3">
            {donutBases.map((base) => (
              <BaseOption
                key={base.id}
                base={base}
                isSelected={donutBase.id === base.id}
                onClick={() => setDonutBase(base)}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setActiveTab("frosting")} className="bg-pink-500 hover:bg-pink-600">
              Next: Frosting
            </Button>
          </div>
        </TabsContent>

        {/* Frosting Selection */}
        <TabsContent value="frosting" className="space-y-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800">Choose your frosting</h3>
          <div className="grid grid-cols-3 gap-3">
            {frostingColors.map((color) => (
              <FrostingOption
                key={color.id}
                frosting={color}
                isSelected={frosting.id === color.id}
                onClick={() => setFrosting(color)}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveTab("base")}>
              Back: Base
            </Button>
            <Button onClick={() => setActiveTab("toppings")} className="bg-pink-500 hover:bg-pink-600">
              Next: Toppings
            </Button>
          </div>
        </TabsContent>

        {/* Toppings Selection */}
        <TabsContent value="toppings" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Choose your toppings</h3>
            <span className="text-sm text-gray-500">{selectedToppings.length}/3 selected</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {toppings.map((topping) => (
              <ToppingOption
                key={topping.id}
                topping={topping}
                isSelected={selectedToppings.some((t) => t.id === topping.id)}
                onClick={() => toggleTopping(topping)}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveTab("frosting")}>
              Back: Frosting
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BaseOption({ base, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all
        ${
          isSelected
            ? "border-2 border-pink-500 bg-pink-50"
            : "border border-gray-200 hover:border-pink-200 hover:bg-pink-50/30"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: base.color }} />
        <span className="font-medium">{base.name}</span>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-0.5">
          <Check size={14} />
        </div>
      )}
    </motion.div>
  )
}

function FrostingOption({ frosting, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-3 rounded-lg cursor-pointer transition-all flex flex-col items-center
        ${
          isSelected
            ? "border-2 border-pink-500 bg-pink-50"
            : "border border-gray-200 hover:border-pink-200 hover:bg-pink-50/30"
        }
      `}
    >
      <div className="w-12 h-12 rounded-full mb-2" style={{ backgroundColor: frosting.color }} />
      <span className="text-sm font-medium text-center">{frosting.name}</span>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-0.5">
          <Check size={14} />
        </div>
      )}
    </motion.div>
  )
}

function ToppingOption({ topping, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all
        ${
          isSelected
            ? "border-2 border-pink-500 bg-pink-50"
            : "border border-gray-200 hover:border-pink-200 hover:bg-pink-50/30"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{topping.icon}</div>
        <span className="font-medium">{topping.name}</span>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-0.5">
          <Check size={14} />
        </div>
      )}
    </motion.div>
  )
}
