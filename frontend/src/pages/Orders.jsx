import React from "react";

const Orders = ({ orders }) => {
  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-500 text-lg">No orders placed yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 w-fit">
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-700">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex flex-col md:flex-row md:justify-between gap-4">
                {order.paymentMethod && (
                  <p className="text-sm text-gray-600">
                    Payment Method:{" "}
                    <span className="font-medium text-gray-900">
                      {order.paymentMethod}
                    </span>
                  </p>
                )}

                <div className="flex justify-between md:justify-end gap-4 font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>

              {order.deliveryAddress && (
                <div className="border-t mt-6 pt-6">
                  <p className="font-semibold text-gray-900 mb-2">
                    Delivery Address
                  </p>

                  <p className="text-sm text-gray-700">
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

                  <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
                    {order.deliveryAddress.type}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
