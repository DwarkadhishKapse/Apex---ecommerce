import React, { useEffect, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

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

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...formData, id: editingAddress.id }
            : addr
        )
      );
      setEditingAddress(null);
    } else {
      const newAddress = {
        id: `ADDR-${Date.now()}`,
        ...formData,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }

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

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem("addresses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { product }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const moveToCart = (product) => {
    removeFromWishlist(product.id);
    addToCart(product);
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-[#f5f3ff] via-[#fafafa] to-[#eef2ff]">
        <Navbar
          cartCount={cart.length}
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
          wishlistCount={wishlist.length}
          ordersCount={orders.length}
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
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
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
                    setCart={setCart}
                    clearCart={clearCart}
                    orders={orders}
                    setOrders={setOrders}
                    addresses={addresses}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  removeFromWishlist={removeFromWishlist}
                  moveToCart={moveToCart}
                />
              }
            />

            <Route path="/orders" element={<Orders orders={orders} />} />

            <Route
              path="/orders/:orderId"
              element={<OrderDetails orders={orders} />}
            />

            <Route
              path="/addresses"
              element={
                <Addresses
                  addresses={addresses}
                  setAddresses={setAddresses}
                  handleAddAddress={handleAddAddress}
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
                  editingAddress={editingAddress}
                  setEditingAddress={setEditingAddress}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
