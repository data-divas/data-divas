'use client'

import React, { useRef, useState, useEffect } from "react"
import Webcam from "react-webcam"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Loader2, Scan } from 'lucide-react'

// Mock function for product detection
// const detectProduct = (imageData: ImageData): Promise<{ name: string; properties: string[] } | null> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: 'Product Name',
//         properties: ['Property 1', 'Property 2', 'Property 3']
//       })
//     }, 2000) 
//   })
// }

export default function ProductScanner() {
  const webcamRef = useRef<Webcam>(null)
  const [scannedProducts, setScannedProducts] = useState<Array<{ name: string; properties: string[] }>>([])
  const [isScanning, setIsScanning] = useState(false)

  const captureImage = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      const img = new Image()
      img.src = imageSrc
      img.onload = async () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          setIsScanning(true)
          const product = await detectProduct(imageData)
          setIsScanning(false)
          if (product) {
            setScannedProducts(prev => [...prev, product])
          }
        }
      }
    }
  }, [webcamRef])

  useEffect(() => {
    const interval = setInterval(captureImage, 1000) // Scan every second
    return () => clearInterval(interval)
  }, [captureImage])

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center">Product Scanner</h1>
      </header>
      <main className="flex-grow relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment"
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-4 border-white rounded-lg"></div>
        </div>
        {isScanning && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </main>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <Scan className="mr-2 h-4 w-4" /> View Scanned Products
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Scanned Products</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {scannedProducts.map((product, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold">{product.name}</h3>
                <ul className="mt-2 space-y-1">
                  {product.properties.map((prop, propIndex) => (
                    <li key={propIndex} className="text-sm text-gray-600">{prop}</li>
                  ))}
                </ul>
              </div>
            ))}
            {scannedProducts.length === 0 && (
              <p className="text-center text-gray-500">No products scanned yet.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// const capture = () => {
//   if (webcamRef.current) {
//     const imageSrc = webcamRef.current.getScreenshot();
//     console.log("Captured Image:", imageSrc); // Base64-encoded image string
//   }
// };