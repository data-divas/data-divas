"use client"

import React, { useRef, useState, useEffect } from "react"
import Webcam from "react-webcam"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Loader2, Scan, ShoppingCart } from 'lucide-react'
import Link from "next/link"
import { CarbonFootprintModal } from '@/components/ScanResult'
import NavBar from "@/components/NavBar"

export default function ProductScanner() {
  const [detections, setDetections] = useState<
    Array<{
      box: { x: number; y: number; w: number; h: number }
      label: string
      confidence: number
    }>
  >([])
  const webcamRef = useRef<Webcam>(null)
  const [scannedProducts, setScannedProducts] = useState<
    Array<{ name: string; properties: string[] }>
  >([])
  const [isScanning, setIsScanning] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scanStep, setScanStep] = useState(0)
  const [scanResult, setScanResult] = useState("")
  const [aspectRatio, setAspectRatio] = useState(0)
  const [extractedText, setExtractedText] = useState([])
  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [extractedProductString, setExtractedProductString] = useState([])

  useEffect(() => {
    function handleResize() {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
      const ratio = Math.max(vw, vh) / Math.min(vw, vh)
      setAspectRatio(ratio)
      setDimensions({
        width: vw,
        height: vh,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: "environment",
    aspectRatio: { ideal: aspectRatio },
  }

  const simulateScan = async () => {
    setIsScanning(true)
    setScanStep(0)

    const steps = [
      { caption: "Let me check the product type... 🧐", duration: 3000 },
      { caption: "Analyzing carbon emissions based on this product... ", duration: 4000 },
      { caption: "Based on the product's materials, the estimated carbon footprint is... ", duration: 0 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setScanStep(i + 1)
      setScanResult(steps[i].caption)
      if (steps[i].duration > 0) {
        await new Promise(resolve => setTimeout(resolve, steps[i].duration))
      } else {
        try {
          const paragraph = extractedText
            .map((item) => item.text)
            .join("\n");

          const product = await getProductAndWeight(paragraph);
          setExtractedProductString(product);
          
          console.log("Product:", product);
          setIsModalOpen(true)
        } catch (error) {
          console.error('Error fetching carbon footprint:', error)
          setScanResult('Error fetching carbon footprint. Please try again.')
        }
        setIsScanning(false)
      }
    }
  }

  const captureImage = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      try {
        const response = await fetch(
          "https://zfhct821-8000.use.devtunnels.ms/detect-product",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageSrc }),
          }
        )

        const data = await response.json();
        console.log("Detected products:", data);
        if (data.success && data.boxes && data.labels) {
          const newDetections = data.boxes.map((box: any, index: number) => ({
            box,
            label: data.labels[index],
            confidence: data.confidences[index],
          }))
          setDetections(newDetections)
        }
      } catch (error) {
        console.error("Error detecting product:", error)
      }
    }
  }, [webcamRef]);

  const captureText = React.useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const file = await fetch(imageSrc)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })
          )

        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await fetch(
            "https://zrcctnww-8000.use.devtunnels.ms/ocr/",
            {
              method: "POST",
              body: formData,
            }
          )

          if (!response.ok) {
            throw new Error("OCR request failed")
          }

          const data = await response.json();
          console.log("extracted text", data.extracted_text);

          const mappedResults = data.extracted_text.map((ocrResult) => {
            const ocrBox = ocrResult.bounding_box.flat()
            const matchingDetection = detections.find((detection) =>
              isInside(ocrBox, detection.box)
            )

            return {
              ...ocrResult,
              matchingDetection: matchingDetection
                ? {
                    label: matchingDetection.label,
                    confidence: matchingDetection.confidence,
                  }
                : null,
            }
          })
          console.log("mappedresult", mappedResults)

          setExtractedText(mappedResults)
        } catch (error) {
          console.error("Error during OCR:", error)
        }
      }
    }
  }, [webcamRef, detections])

  const isInside = (ocrBox, cvBox) => {
    const [x1, y1, x2, y2] = ocrBox
    const { x, y, w, h } = cvBox
    return x1 >= x && y1 >= y && x2 <= x + w && y2 <= y + h
  }

  useEffect(() => {
    const captureInterval = setInterval(captureImage, 500);
    const ocrInterval = setInterval(captureText, 500);

    return () => {
      clearInterval(captureInterval)
      clearInterval(ocrInterval)
    }
  }, [captureImage, captureText])

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Product added to cart")
    setIsModalOpen(false)
    // You might want to add the scanned product to the scannedProducts array here
  }

  const getProductAndWeight = async (product: string) => {
    try {
      const response = await fetch(
        "https://zfhct821-8000.use.devtunnels.ms/parse-product-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: product }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Product details:", data.message.content);
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100 z-10">
        <NavBar/>
      <main className="flex-grow relative w-[100vw] h-[90vh] flex items-center justify-center">
        {detections.map((detection, index) => (
          <div key={index}>
            <div
              className="absolute bg-red-500 text-white px-1 py-0.5 text-xs md:text-sm rounded-t-md z-30"
              style={{
                left: `${detection.box.x}px`,
                top: `${detection.box.y - 20}px`,
                transform: "translateY(-2px)",
              }}
            >
              {detection.label} {(detection.confidence * 100).toFixed(0)}%
            </div>
            <div
              className="absolute border-2 border-red-500 z-20"
              style={{
                left: `${detection.box.x}px`,
                top: `${detection.box.y}px`,
                width: `${detection.box.w}px`,
                height: `${detection.box.h}px`,
              }}
            />
          </div>
        ))}
        {extractedText.map((result, index) => (
          <div key={`ocr-${index}`}>
            <div
              className="absolute bg-blue-500 text-white px-1 py-0.5 text-xs md:text-sm rounded-md z-40"
              style={{
                left: `${result.bounding_box[0][0]}px`,
                top: `${result.bounding_box[0][1]}px`,
              }}
            >
              {result.text}
              {result.matchingDetection && (
                <span className="ml-1 text-xs">
                  ({result.matchingDetection.label}:{" "}
                  {(result.matchingDetection.confidence * 100).toFixed(0)}%)
                </span>
              )}
            </div>
          </div>
        ))}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="absolute object-cover w-full h-full"
        />
        {isScanning && (
          <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full z-50">
            <p className="text-sm md:text-lg font-semibold text-center">{scanResult}</p>
          </div>
        )}
      </main>
      <div className="fixed bottom-4 left-4 right-4 z-30 flex gap-2 justify-center">
        <Button
          size="sm"
          onClick={simulateScan}
          disabled={isScanning}
          className="flex-grow max-w-[200px]"
        >
          <Scan className="mr-2 h-4 w-4" /> Scan Product
        </Button>
        
      </div>
      <CarbonFootprintModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        carbonFootprint={carbonFootprint}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}