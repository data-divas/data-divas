// components/LoadingAnimation.tsx
import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="flex space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
        <div className="h-3 w-3 bg-white rounded-full animate-pulse [animation-delay:0.2s]"></div>
        <div className="h-3 w-3 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;