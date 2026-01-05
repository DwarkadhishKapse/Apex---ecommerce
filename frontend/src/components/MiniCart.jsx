import React from "react";
import { Link } from "react-router-dom";

const MiniCart = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  setIsMiniCartOpen,
}) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="absolute right-0 top-7 mt-3 w-90 max-w-[90vw] bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">My Cart</h3>
          <button
            onClick={() => setIsMiniCartOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            Your cart is empty
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex-1 pr-2">
                <p className="text-sm font-medium truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500">
                  ₹{item.product.price}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.product.id)}
                    className="w-6 h-6 border rounded"
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.product.id)}
                    className="w-6 h-6 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-500 text-sm ml-2"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between font-semibold mb-4">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/cart"
              onClick={() => setIsMiniCartOpen(false)}
              className="w-full text-center bg-[#1F3A8A] text-white py-2 rounded-lg hover:bg-[#1E40AF]"
            >
              View Cart
            </Link>

            <Link
              to="/checkout"
              onClick={() => setIsMiniCartOpen(false)}
              className="w-full text-center border py-2 rounded-lg"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
