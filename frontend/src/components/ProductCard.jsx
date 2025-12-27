import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const ProductCard = ({ product, addToCart, searchQuery }) => {
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
        {/* Image */}
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image</span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">
            {searchQuery
              ? highlightText(product.title, searchQuery)
              : product.title}
          </h3>

          <StarRating rating={product.rating} reviews={product.reviews} />

          <p className="text-sm text-gray-500 mt-1">{product.description}</p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>

            <button
              onClick={() => addToCart(product)}
              className="bg-[#1F3A8A] cursor-pointer text-white text-sm px-4 py-2 rounded-md hover:bg-[#1E40AF] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
