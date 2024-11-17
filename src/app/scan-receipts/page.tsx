'use client'

import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import LoadingAnimation from "../components/LoadingAnimation"

export default function ReceiptScanner() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  const capture = useCallback(() => {
    setIsCapturing(true)
    setTimeout(() => {
      setIsCapturing(false)
      setIsLoading(true)
      // Simulate processing time
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }, 500)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
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