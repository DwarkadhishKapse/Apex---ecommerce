import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-8">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500">
          No orders placed yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total Items</span>
                <span>{order.totalItems}</span>
              </div>

              <div className="flex justify-between font-semibold mt-2">
                <span>Total Amount</span>
                <span>₹{order.totalAmount}</span>
              </div>

              <Link
                to={`/orders/${order.id}`}
                className="inline-block mt-4 text-[#6d5dfc] hover:underline"
              >
                View Order Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
