'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import NavBar from '@/components/NavBar'
import { useEffect, useState } from 'react'


interface CartItem {
  name: string;
  carbonEmission: number;
  points: number;
}


export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    } 
  }, [])

  const handleRemoveAllFromCart = () => {
    setCartItems([])
    localStorage.clear()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                      <Leaf className="h-4 w-4 text-green-500 mr-1" />
                      {item.carbonEmission} kg CO2e
                    </p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{item.points} points</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <Button asChild onClick={handleRemoveAllFromCart}>
              <Link href="/scan-receipts">Confirm Purchase</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Add Item</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}