import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = ({ orders }) => {
  const { orderId } = useParams();

  const statusSteps = [
    "Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  if (!orders || orders.length === 0) {
    return <div className="p-6 text-gray-500">Loading order details</div>;
  }

  const order = orders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div className="p-6 text-red-600 font-semibold">Order not found</div>
    );
  }

  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Order #{order.id}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>

            <div className="flex flex-col gap-4">
              {statusSteps.map((step, index) => {
                const isCompleted =
                  statusSteps.indexOf(order.status) >= index;

                return (
                  <div key={step} className="flex items-center gap-4">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isCompleted ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isCompleted ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Items</h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-start border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold text-gray-900">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              Delivery Address
            </h3>

            <p className="font-medium text-gray-900">
              {order.deliveryAddress.name}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {order.deliveryAddress.street},{" "}
              {order.deliveryAddress.city},{" "}
              {order.deliveryAddress.state} -{" "}
              {order.deliveryAddress.pincode}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Phone: {order.deliveryAddress.phone}
            </p>

            <span className="inline-block mt-3 text-xs bg-gray-100 px-3 py-1 rounded-full">
              {order.deliveryAddress.type}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-8">
          <h3 className="text-lg font-semibold mb-4">
            Price Details
          </h3>

          <div className="flex justify-between text-gray-700 mb-3">
            <span>Items Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-3">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total Paid</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            Payment Method: {order.paymentMethod}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
