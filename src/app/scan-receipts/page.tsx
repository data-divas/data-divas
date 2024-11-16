"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function ScanReceiptsPage() {
  const webcamRef = useRef<Webcam>(null);
  const [isProductsOverlayVisible, setProductsOverlayVisible] = useState(false);

  const onShowProductsButtonClick = () => {
    setProductsOverlayVisible(true);
  };

  const onHideProductsButtonClick = () => {
    setProductsOverlayVisible(false);
  };

  return (
    <div style={flexCenterStyle}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      {!isProductsOverlayVisible && (
        <button onClick={onShowProductsButtonClick}>Show Products</button>
      )}

      {isProductsOverlayVisible && ProductsOverlay(onHideProductsButtonClick)}
    </div>
  );
}

const flexCenterStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: 'column', // Arranges items vertically
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}

const productsOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Makes sure the overlay is on top of everything
};

function ProductsOverlay(onHideProductsButtonClick: any) {
  return (
    <div style={productsOverlayStyle}>
      <div>
        <button onClick={onHideProductsButtonClick}>X</button>
        <h2>Product List</h2>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
        </ul>
      </div>
    </div>
  );
}
