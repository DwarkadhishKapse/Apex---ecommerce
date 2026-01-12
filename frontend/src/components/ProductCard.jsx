import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const ProductCard = ({
  product,
  addToCart,
  searchQuery,
  wishlist = [],
  toggleWishlist,
}) => {
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 rounded px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const isWishListed =
    wishlist?.some((item) => item.id === product.id) || false;

  return (
    <div className="relative bg-white rounded-2xl border hover:shadow-lg transition overflow-hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-4 right-4 z-10 text-xl bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
      >
        {isWishListed ? "❤️" : "🤍"}
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
            {searchQuery
              ? highlightText(product.title, searchQuery)
              : product.title}
          </h3>

          <div className="mt-1">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">
          ₹{product.price}
        </span>

        <button
          onClick={() => addToCart(product)}
          className="bg-[#6d5dfc] text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
