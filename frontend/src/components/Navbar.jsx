import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MiniCart from "./MiniCart";
import products from "../data/products";

const Navbar = ({
  cartCount,
  wishlistCount,
  ordersCount,
  isAuthenticated,
  setIsAuthenticated,
  searchQuery,
  setSearchQuery,
  cart,
  isMiniCartOpen,
  setIsMiniCartOpen,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const miniCartWrapperRef = useRef(null);

  // reset search selection when text changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  // close mini cart on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMiniCartOpen &&
        miniCartWrapperRef.current &&
        !miniCartWrapperRef.current.contains(e.target)
      ) {
        setIsMiniCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMiniCartOpen]);

  const suggestions =
    searchQuery.length > 0
      ? products
          .filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 important
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      navigate(`/product/${suggestions[activeIndex].id}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-[60] border-b">
      <div className="max-w-350 mx-auto px-4 py-4 flex items-center gap-6">
        {/* LOGO */}
        <h1
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Apex<span className="text-[#6d5dfc]">Store</span>
        </h1>

        {/* SEARCH */}
        <div className="relative flex-1 z-[70]">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products"
            className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-[#6d5dfc] outline-none"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-xl mt-2 z-[80]">
              {suggestions.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    setSearchQuery("");
                  }}
                  className={`px-4 py-3 cursor-pointer flex justify-between ${
                    index === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-gray-500">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WISHLIST */}
        <Link to="/wishlist" className="relative">
          ❤️
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* CART */}
        <div ref={miniCartWrapperRef} className="relative">
          <button onClick={() => setIsMiniCartOpen((p) => !p)}>
            Cart {cartCount > 0 && <span>({cartCount})</span>}
          </button>

          {isMiniCartOpen && (
            <MiniCart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
              setIsMiniCartOpen={setIsMiniCartOpen}
            />
          )}
        </div>

        {/* ORDERS */}
        <Link to="/orders">Orders {ordersCount > 0 && `(${ordersCount})`}</Link>

        {/* AUTH */}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-red-600">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-[#6d5dfc]">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
