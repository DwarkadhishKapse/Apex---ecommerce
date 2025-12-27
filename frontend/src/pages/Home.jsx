import React, { useEffect, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = ({ addToCart, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [onlyTopRated, setOnlyTopRated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categoryIcons = {
    all: "🛍️",
    Accessories: "🛍️",
    Bags: "🎒",
    Electronics: "📱",
    Fashion: "👕",
    Fitness: "🏋️‍♂️",
    Footwear: "👟",
    Furniture: "🪑",
    Home: "🏠",
    Books: "📚",
    Lifestyle: "😎",
    Stationery: "📝",
  };

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category.trim())),
  ];

  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    acc.all = products.length;
    return acc;
  }, {});

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    const matchesRating = !onlyTopRated || Number(product.rating) >= 4;

    return matchesCategory && matchesSearch && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Mobile Category Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden mb-4 px-4 py-2 bg-[#1F3A8A] text-white rounded-lg"
      >
        Categories
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* For Mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        <aside
          className={`fixed lg:static top-0 left-0 h-full w-64 bg-white z-50 p-4 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        >
          <h3 className="text-lg font-semibold mb-4">Categories</h3>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition mb-1
                ${
                  selectedCategory === category
                    ? "bg-[#1F3A8A] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{categoryIcons[category] || "📦"}</span>
                <span className="capitalize">{category}</span>
              </div>

              <span className="text-sm opacity-80">
                {category === "all" ? products.length : categoryCount[category]}
              </span>
            </button>
          ))}
        </aside>

        <section className="lg:col-span-3">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="topRated"
              checked={onlyTopRated}
              onChange={(e) => setOnlyTopRated(e.target.checked)}
            />

            <label
              htmlFor="topRated"
              className="text-sm text-gray-700 cursor-pointer"
            >
              4★ & above
            </label>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-center col-span-full mt-10">
                No products found
              </p>
            )}

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                searchQuery={debouncedQuery}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
