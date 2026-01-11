import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";

const ProductDetails = ({ addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        const similarRes = await api.get(
          `/products?category=${res.data.category}`
        );
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading Product...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <div className="max-w-350 mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-8">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-gray-700 cursor-pointer">
          {product.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="h-105 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Product Image</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-medium text-gray-900">Quantity</span>

            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                −
              </button>

              <span className="px-6 font-medium">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, quantity)}
            className="mt-8 w-full max-w-md bg-[#6d5dfc] text-white py-4 rounded-xl font-medium hover:opacity-90 transition"
          >
            Add to Cart
          </button>

          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

            <div className="flex items-center gap-5">
              <span className="text-4xl font-bold text-gray-900">
                {product.rating}
              </span>

              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Based on {product.reviews} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>

          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className="overflow-x-auto"
          >
            <div className="flex gap-6 w-max pb-2">
              {similarProducts.map((item) => (
                <div key={item.id} className="w-65 shrink-0">
                  <ProductCard product={item} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
