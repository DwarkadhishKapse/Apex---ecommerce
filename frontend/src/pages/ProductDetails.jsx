import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const ProductDetails = ({ addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const product = products.find((p) => p.id === Number(id));

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">
          {product.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>
      {/* Left Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg">
            <span className="text-gray-400">Product Image</span>
          </div>
        </div>

        {/* Right Side Info */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500">
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mt-4">
            ₹{product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 cursor-pointer"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, quantity)}
            className="mt-6 w-full bg-[#1F3A8A] text-white py-3 rounded-lg hover:bg-[#1E40AF] transition"
          >
            Add to Cart
          </button>

          {/* reviews */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{product.rating}</span>
              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Based on {product.reviews} reviews
                </p>
              </div>
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">Similar products</h2>

              <div
                ref={scrollRef}
                onWheel={handleWheel}
                className="overflow-x-auto"
              >
                <div className="flex gap-6 w-max">
                  {similarProducts.map((item) => (
                    <div key={item.id} className="w-62.5 shrink-0">
                      <ProductCard product={item} addToCart={addToCart} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
