import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* LEFT — CART ITEMS */}
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <p className="text-gray-500 text-lg">
                Your cart is empty.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.product.title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-lg">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-8">
            <h3 className="text-lg font-semibold mb-6">
              Order Summary
            </h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t mt-6 pt-4 flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center mt-6 bg-[#6d5dfc] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
