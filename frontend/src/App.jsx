import React, { useEffect, useState } from "react";
import api from "./api/axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  // ---------------- AUTH STATE ----------------
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [authLoading, setAuthLoading] = useState(true);

  // ---------------- GLOBAL STATES ----------------
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [addresses, setAddresses] = useState([]);

  // ---------------- UI STATES ----------------
  const [searchQuery, setSearchQuery] = useState("");
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // ---------------- RESTORE SESSION ON REFRESH ----------------
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        await api.get("/auth/me");
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ---------------- FETCH ORDERS COUNT ----------------
  const fetchOrdersCount = async () => {
    try {
      const res = await api.get("/orders");
      setOrdersCount(res.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchOrdersCount();
  }, [isAuthenticated]);

  // ---------------- FETCH CART ----------------
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  // ---------------- FETCH WISHLIST ----------------
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/wishlist")
      .then((res) => setWishlist(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  // ---------------- FETCH ADDRESSES ----------------
  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/addresses")
      .then((res) => setAddresses(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  // ---------------- ADDRESS FORM STATE ----------------
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
  };

  // ---------------- CART ACTIONS ----------------
  const addToCart = async (product, quantity = 1) => {
    try {
      const res = await api.post("/cart/add", {
        productId: product.id,
        quantity,
      });
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = async (productId) => {
    const res = await api.put("/cart/update", {
      productId,
      action: "increase",
    });
    setCart(res.data);
  };

  const decreaseQuantity = async (productId) => {
    const res = await api.put("/cart/update", {
      productId,
      action: "decrease",
    });
    setCart(res.data);
  };

  const removeItem = async (productId) => {
    const res = await api.delete(`/cart/remove/${productId}`);
    setCart(res.data);
  };

  const clearCart = async () => {
    await api.post("/cart/clear");
    setCart([]);
  };

  // ---------------- WISHLIST ACTIONS ----------------
  const toggleWishlist = async (productId) => {
    const res = await api.post("/wishlist/toggle", { productId });
    setWishlist(res.data);
  };

  const moveToCart = async (product) => {
    await addToCart(product);
    await toggleWishlist(product.id);
  };

  // ---------------- LOADING SCREEN ----------------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Restoring session...
      </div>
    );
  }

  // ---------------- ROUTES ----------------
  return (
    <BrowserRouter>
      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        ordersCount={ordersCount}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        isMiniCartOpen={isMiniCartOpen}
        setIsMiniCartOpen={setIsMiniCartOpen}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeItem={removeItem}
      />

      <main className="max-w-350 mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                searchQuery={searchQuery}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />

          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart
                  cart={cart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={removeItem}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Checkout
                  cart={cart}
                  clearCart={clearCart}
                  addresses={addresses}
                  onOrderPlaced={fetchOrdersCount}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} moveToCart={moveToCart} toggleWishlist={toggleWishlist} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />

          <Route
            path="/addresses"
            element={
              <Addresses
                addresses={addresses}
                setAddresses={setAddresses}
                handleAddAddress={handleAddAddress}
                handleChange={handleChange}
                formData={formData}
                editingAddress={editingAddress}
                setEditingAddress={setEditingAddress}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
