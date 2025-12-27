import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
              >
                {/* Product Info */}
                <div>
                  <p className="font-medium text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{item.product.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.product.id)}
                      className="w-8 h-8 rounded border hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.product.id)}
                      className="w-8 h-8 rounded border hover:bg-gray-100"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-500 ml-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <p className="font-semibold text-gray-900">
                  ₹{item.product.price * item.quantity}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-semibold mt-4">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center mt-6 bg-[#1F3A8A] text-white py-3 rounded-lg hover:bg-[#1E40AF] transition"
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
