"use client";
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
import { Loader2, Scan } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Detection {
  box: Box;
  label: string;
  confidence: number;
}

interface Product {
  name: string;
  properties: string[];
}

interface Dimension {
  width: number;
  height: number;
}

export default function ProductScanner() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [scannedProducts, setScannedProducts] = useState<Product[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  });
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string[]>([]);

  useEffect(() => {
    function handleResize() {
      // Get the viewport dimensions
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      // Calculate aspect ratio (always use landscape orientation)
      const ratio = Math.max(vw, vh) / Math.min(vw, vh);

      setAspectRatio(ratio);
      setDimensions({
        width: vw,
        height: vh,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: "environment",
    aspectRatio: { ideal: aspectRatio },
  };

  const captureImage = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setIsScanning(true);
    try {
      const data = await getDetections(imageSrc);
      if (!data.success || !data.boxes || !data.labels) return;

      // Combine boxes, labels, and confidences into detections array
      const newDetections: Detection[] = data.boxes.map(
        (box: Box, index: number) => ({
          box,
          label: data.labels[index],
          confidence: data.confidences[index],
        })
      );
      setDetections(newDetections);
    } catch (error) {
      console.error("Error detecting product:", error);
    } finally {
      setIsScanning(false);
    }
  }, [webcamRef]);

  const captureTextProducts = React.useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const extractedText = await getExtractedText(imageSrc);
      console.log("extracted text", extractedText);
      setExtractedText(extractedText);
    } catch (error) {
      console.error("Error during OCR:", error);
    }
  }, [webcamRef]);

  const captureTextReceipts = React.useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const extractedText = await getExtractedText(imageSrc);
      console.log("extracted text", extractedText);
      setExtractedText(extractedText);
    } catch (error) {
      console.error("Error during OCR:", error);
    }

    // todo pass extracted text to ai to get product names
    // get co2 emmisions from product names using api
  }, [webcamRef]);

  const [tab, setTab] = useState("Products");
  useEffect(() => {
    if (tab === "Products") {
      const captureInterval = setInterval(captureImage, 200);
      const ocrInterval = setInterval(captureTextProducts, 5000);

      // Cleanup function
      return () => {
        clearInterval(captureInterval);
        clearInterval(ocrInterval);
      };
    } else if (tab === "Receipts") {
      const ocrInterval = setInterval(captureTextReceipts, 5000);

      // Cleanup function
      return () => {
        clearInterval(ocrInterval);
      };
    } else {
      throw new Error("Invalid tab value");
    }
  }, [captureImage, captureTextProducts, captureTextReceipts, tab]);

  return (
    <>
      <div className="flex flex-col h-[100vh] bg-gray-100 z-10">
        <header className="h-[10vh] flex items-center justify-center bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-center">{tab} Scanner</h1>
        </header>
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" onClick={() => setTab("Products")}>
              Products
            </TabsTrigger>
            <TabsTrigger value="receipts" onClick={() => setTab("Receipts")}>
              Receipts
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
        {scannedProductsSheet(scannedProducts)}
      </div>
    </>
  );
}

function scannedProductsSheet(scannedProducts: Product[]): React.JSX.Element {
  return <Sheet>
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
                <li key={propIndex} className="text-sm text-gray-600">
                  {prop}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {scannedProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No products scanned yet.
          </p>
        )}
      </div>
    </SheetContent>
  </Sheet>;
}

async function getExtractedText(imageSrc: string): Promise<string[]> {
  // Convert base64 image to file
  const file = await fetch(imageSrc)
    .then((res) => res.blob())
    .then(
      (blob) => new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })
    );

  // Create FormData and append file
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://zfhct821-8000.use.devtunnels.ms/ocr/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("OCR request failed");
  }

  const data = await response.json();
  return data.extracted_text;
}

async function getDetections(imageSrc: string) {
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
  return data;
}
