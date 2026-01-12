import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="w-65 bg-white border rounded-2xl p-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
    </div>
  );
};

export default ProductCardSkeleton;
