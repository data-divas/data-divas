"use client"

import React, { useRef } from "react";
import Webcam from "react-webcam";

const CameraApp = () => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured Image:", imageSrc); // Base64-encoded image string
    }
  };

  return (
    <div>
      <h1>React Camera App</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default CameraApp;
