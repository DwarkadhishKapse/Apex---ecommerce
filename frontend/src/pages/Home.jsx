import React, { useEffect, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = ({
  addToCart,
  searchQuery,
  wishlist,
  addToWishlist,
  removeFromWishlist,
}) => {
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden mb-4 px-4 py-2 rounded-xl bg-[#6d5dfc] text-white shadow-sm"
      >
        Categories
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* CATEGORY SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky top-0 lg:top-28 left-0
            h-full lg:h-fit w-64
            bg-white z-40
            p-5 rounded-r-2xl lg:rounded-2xl shadow-sm
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <h3 className="text-lg font-semibold mb-4">Categories</h3>

          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl transition
                  ${
                    selectedCategory === category
                      ? "bg-[#6d5dfc] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span>{categoryIcons[category] || "📦"}</span>
                  <span className="capitalize">{category}</span>
                </div>

                <span className="text-sm opacity-80">
                  {category === "all"
                    ? products.length
                    : categoryCount[category]}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}
        <section>
          <div className="flex items-center gap-2 mb-5">
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
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
