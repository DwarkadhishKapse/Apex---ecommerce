import React, { useState } from "react";

const Checkout = ({ cart, clearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — ORDER DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between border-b pb-3 mb-3"
            >
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ₹{item.product.price}
                </p>
              </div>

              <span className="font-semibold">
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT — PLACE ORDER */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={orderPlaced}
            className={`w-full py-3 rounded-lg transition
            ${
              orderPlaced
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-[#1F3A8A] text-white hover:bg-[#1E40AF]"
            }`}
          >
            {orderPlaced ? "Order Placed!" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
