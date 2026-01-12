import React from "react";
import { Link } from "react-router-dom";

const Wishlist = ({ wishlist = [], toggleWishlist, moveToCart }) => {
  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <p className="text-gray-500 text-lg mb-6">Your wishlist is empty</p>

          <Link
            to="/"
            className="inline-block bg-[#6d5dfc] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col"
            >
              <div className="h-44 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="font-medium text-gray-900 truncate">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-1">₹{item.price}</p>

              <div className="mt-auto pt-4 flex gap-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="flex-1 bg-[#6d5dfc] text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="flex-1 border border-gray-300 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
