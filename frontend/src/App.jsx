import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./api/axios";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [authLoading, setAuthLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  /* ======================================================
     RESTORE LOGIN SESSION ON PAGE REFRESH */
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
      } catch (err) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  /* ======================================================
     FETCH ORDERS COUNT (for Navbar badge) */
  const fetchOrdersCount = async () => {
    try {
      const res = await api.get("/orders");
      setOrdersCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch orders count", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchOrdersCount();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/wishlist")
      .then((res) => setWishlist(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get("/addresses")
      .then((res) => setAddresses(res.data))
      .catch(console.error);
  }, [isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    try {
      const res = await api.post("/cart/add", {
        productId: product.id,
        quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const increaseQuantity = async (productId) => {
    try {
      const res = await api.put("/cart/update", {
        productId,
        action: "increase",
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const res = await api.put("/cart/update", {
        productId,
        action: "decrease",
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/remove/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.post("/cart/clear");
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const res = await api.post("/wishlist/toggle", { productId });
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const moveToCart = async (product) => {
    await addToCart(product);
    await toggleWishlist(product.id);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Restoring session...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar
        products={products}
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

          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />

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

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                moveToCart={moveToCart}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />

          <Route
            path="/addresses"
            element={
              <Addresses
                addresses={addresses}
                setAddresses={setAddresses}
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
