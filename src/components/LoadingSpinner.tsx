import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
    <p className="text-gray-600">Analyzing musical patterns...</p>
    </div>
  );
};

export default LoadingSpinner;
