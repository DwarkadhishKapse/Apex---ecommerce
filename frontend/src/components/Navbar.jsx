import React, { useEffect, useState } from "react";
import products from "../data/products";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  cartCount,
  isAuthenticated,
  setIsAuthenticated,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchQuery]);

  const suggestions =
    searchQuery.length > 0
      ? products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const handleLogout = () => {
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-xl font-semibold text-gray-900">
          Apex<span className="text-[#1F3A8A]">Store</span>
        </h1>

        <div className="relative flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 z-50">
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
                  <span className="text-sm">{item.title}</span>
                  <span className="text-sm text-gray-500">{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            Cart{" "}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-sm text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm text-[#1F3A8A]">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
