"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Scan, User } from "lucide-react";
import Link from "next/link";

export default function ProductScanner() {
  const [detections, setDetections] = useState<
    Array<{
      box: { x: number; y: number; w: number; h: number };
      label: string;
      confidence: number;
    }>
  >([]);
  const webcamRef = useRef<Webcam>(null);
  const [scannedProducts, setScannedProducts] = useState<
    Array<{ name: string; properties: string[] }>
  >([]);
  const [isScanning, setIsScanning] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(0);
  const [extractedText, setExtractedText] = useState([]);

  // useEffect(() => {
  //   function handleResize() {
  //     // Get the viewport dimensions
  //     const vw = Math.max(
  //       document.documentElement.clientWidth || 0,
  //       window.innerWidth || 0
  //     );
  //     const vh = Math.max(
  //       document.documentElement.clientHeight || 0,
  //       window.innerHeight || 0
  //     );

  //     // Calculate aspect ratio (always use landscape orientation)
  //     const ratio = Math.max(vw, vh) / Math.min(vw, vh);

  //     setAspectRatio(ratio);
  //     setDimensions({
  //       width: vw,
  //       height: vh,
  //     });
  //   }

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: "environment",
    aspectRatio: { ideal: aspectRatio },
  };

  const captureImage = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIsScanning(true);
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
        );

        const data = await response.json();
        if (data.success && data.boxes && data.labels) {
          // Combine boxes, labels, and confidences into detections array
          const newDetections = data.boxes.map((box: any, index: number) => ({
            box,
            label: data.labels[index],
            confidence: data.confidences[index],
          }));
          setDetections(newDetections);
        }
      } catch (error) {
        console.error("Error detecting product:", error);
      } finally {
        setIsScanning(false);
      }
    }
  }, [webcamRef]);

  const captureText = React.useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 image to file
        const file = await fetch(imageSrc)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })
          );

        // Create FormData and append file
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(
            "https://zfhct821-8000.use.devtunnels.ms/ocr/",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("OCR request failed");
          }

          const data = await response.json();
          console.log("extracted text", data.extracted_text);
          setExtractedText(data.extracted_text);
        } catch (error) {
          console.error("Error during OCR:", error);
        }
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    const captureInterval = setInterval(captureImage, 200);
    const ocrInterval = setInterval(captureText, 5000);

    // Cleanup function
    return () => {
      clearInterval(captureInterval);
      clearInterval(ocrInterval);
    };
  }, [captureImage, captureText]);

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100 z-10">
      <header className="h-[10vh] flex items-center justify-center bg-white shadow-sm">
        <h1 className="text-2xl text-center absolute font-bold">Product Scanner</h1>
        <Button className="ml-auto px-4 mr-10 py-2">
          <Link href="/profile">
          <User/>
          </Link>
        </Button>
      </header>
      <main className="flex-grow relative w-[100vw] h-[90vh] flex items-center justify-center">
        {detections.map((detection, index) => (
          <div key={index}>
            <div
              className="absolute bg-red-500 text-white px-2 py-1 text-sm rounded-t-md z-30"
              style={{
                left: `${detection.box.x}px`,
                top: `${detection.box.y - 24}px`,
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
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="absolute object-cover w-full h-full"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </main>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
            <Scan className="mr-2 h-4 w-4" /> View Scanned Products
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[80vh]"
          style={{ height: "80vh", overflowY: "auto" }} // Set height and enable vertical scrolling
        >
          <SheetHeader>
            <SheetTitle>Scanned Products</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {scannedProducts.map((product, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold">{product.name}</h3>
                <ul className="mt-2 space-y-1">
                  {product.properties.map((prop, propIndex) => (
                    <div>
                      <li key={propIndex} className="text-sm text-gray-600">
                        {prop}
                      </li>
                      <li key={propIndex} className="text-sm text-gray-600">
                        {prop}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
            {scannedProducts.length === 0 && (
              <div>
                <p className="text-center text-gray-500">
                  No products scanned yet.
                </p>
                <p className="text-center text-gray-500">
                  No products scanned yet.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// const capture = () => {
//   if (webcamRef.current) {
//     const imageSrc = webcamRef.current.getScreenshot();
//     console.log("Captured Image:", imageSrc); // Base64-encoded image string
//   }
// };
