// src/components/UI/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-primaryBg">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-accentGreen"></div>
      <p className="text-textSecondary ml-4 text-xl">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
