'use client'

import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Camera, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-gray-800 flex items-center justify-center">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
)

const mockReceiptItems = [
  { name: 'Organic Apples', price: 3.99, carbonSaved: 0.5 },
  { name: 'Whole Grain Bread', price: 4.49, carbonSaved: 0.3 },
  { name: 'Free-Range Eggs', price: 5.99, carbonSaved: 0.7 },
  { name: 'Plant-Based Milk', price: 3.79, carbonSaved: 0.6 },
  { name: 'Local Honey', price: 7.99, carbonSaved: 0.4 },
]

export default function ReceiptScanner() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  const capture = useCallback(() => {
    setIsCapturing(true)
    setTimeout(() => {
      setIsCapturing(false)
      setIsLoading(true)
      // Simulate processing time
      setTimeout(() => {
        setIsLoading(false)
        setIsVerifying(true)
        // Simulate verification process
        setTimeout(() => {
          setIsVerifying(false)
          setShowResults(true)
        }, 2000)
      }, 30000)
    }, 500)
  }, [])

  const totalSaved = mockReceiptItems.reduce((acc, item) => acc + item.carbonSaved, 0)
  const cashbackAmount = totalSaved * 2 // $2 cashback per kg of carbon saved

  if (isLoading) {
    return <LoadingAnimation />
  }

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-green-100 flex items-center justify-center">
        <div className="text-center">
          <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700">Verification Complete</h2>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Receipt Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockReceiptItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total Carbon Saved: {totalSaved.toFixed(2)} kg
              </p>
              <p className="text-xl font-bold text-green-600 mt-2">
                Cashback Earned: ${cashbackAmount.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative h-full w-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment'
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-[-35px] border-[40px] border-white pointer-events-none" style={{
            borderRadius: '80px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)'
          }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 border-2 border-white rounded-lg flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16"
          onClick={capture}
        >
          <Camera className="h-8 w-8" />
          <span className="sr-only">Capture receipt</span>
        </Button>
      </div>
      {isCapturing && (
        <div className="fixed inset-0 bg-white animate-flash"></div>
      )}
    </div>
  )
}