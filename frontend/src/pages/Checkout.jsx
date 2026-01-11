import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Checkout = ({ cart, clearCart, addresses }) => {
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedAddressId) {
      toast.warning("Please select a delivery address");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await api.post("/orders", {
        addressId: selectedAddressId,
        paymentMethod: selectedPayment,
      });

      toast.success("Order placed successfully 🎉");
      clearCart();
      navigate(`/orders/${res.data.id}`);
    } catch (error) {
      console.error("Failed to place order", error);
      toast.error("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

            {addresses.length === 0 && (
              <p className="text-sm text-gray-500">
                No address found. Please add one.
              </p>
            )}

            {addresses.map((address) => (
              <div
                key={address._id || address.id}
                onClick={() => setSelectedAddressId(address._id || address.id)}
                className={`border rounded-xl p-4 cursor-pointer mb-3 transition ${
                  selectedAddressId === (address._id || address.id)
                    ? "border-[#6d5dfc] bg-indigo-50"
                    : "hover:border-gray-400"
                }`}
              >
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-gray-600">
                  {address.street}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
                <p className="text-sm text-gray-600">Phone: {address.phone}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

            {["COD", "UPI", "CARD"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer mb-3"
              >
                <input
                  type="radio"
                  checked={selectedPayment === method}
                  onChange={() => setSelectedPayment(method)}
                />
                <span className="font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Price Details</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-semibold mt-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="mt-6 w-full py-3 rounded-xl font-medium transition bg-[#6d5dfc] text-white hover:opacity-90 disabled:opacity-60"
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
