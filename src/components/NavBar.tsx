import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white shadow-sm">
      <a className="text-xl md:text-2xl font-bold" href="/">Product Scanner</a>
      <div className="flex items-center space-x-4">
        <Button size="sm" className="px-2 md:px-4">
          <Link href="/points">Spend Points</Link>
        </Button>
        <Link href="/cart">
          <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
        </Link>
      </div>
    </header>
  )
}