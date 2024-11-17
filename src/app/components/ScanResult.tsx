import React from 'react'
import { ShoppingCart } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

interface CarbonFootprintModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  carbonFootprint: number | null
  onAddToCart: () => void
}

export function CarbonFootprintModal({
  isOpen,
  onOpenChange,
  carbonFootprint,
  onAddToCart
}: CarbonFootprintModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Result</DialogTitle>
          <DialogDescription>
            {carbonFootprint !== null
              ? `This product's carbon footprint is ${carbonFootprint} kgCO2e per kg. 🌿`
              : "Unable to determine carbon footprint."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <Button onClick={onAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}