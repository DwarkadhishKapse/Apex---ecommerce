import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();

const products = [
  {
    title: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    description: "High quality wireless headphones with noise cancellation.",
    images: ["https://placehold.co/400x400/31343c/ffffff?text=Headphones"],
    rating: 3.8,
    reviewsCount: Number,
  },
  {
    title: "Running Shoes",
    price: 3999,
    category: "Footwear",
    description: "Lightweight running shoes for everyday workouts.",
    images: ["https://placehold.co/400x400/6a1b9a/ffffff?text=Running+Shoes"],
    rating: 3.6,
    reviewsCount: Number,
  },
  {
    title: "Smart Watch",
    price: 5999,
    category: "Accessories",
    description: "Track your fitness and notifications on the go.",
    images: ["https://placehold.co/400x400/006064/ffffff?text=Smart+Watch"],
    rating: 4.1,
    reviewsCount: Number,
  },
  {
    title: "Casual Backpack",
    price: 1799,
    category: "Bags",
    description: "Durable backpack for daily use and travel.",
    images: ["https://placehold.co/400x400/4e342e/ffffff?text=Backpack"],
    rating: 3.9,
    reviewsCount: Number,
  },
  {
    title: "Bluetooth Speaker",
    price: 2999,
    category: "Electronics",
    description: "Portable speaker with deep bass and clear sound.",
    images: ["https://placehold.co/400x400/283593/ffffff?text=Speaker"],
    rating: 2.9,
    reviewsCount: Number,
  },
  {
    title: "Gaming Mouse",
    price: 1499,
    category: "Electronics",
    description: "High precision mouse designed for gaming.",
    images: ["https://placehold.co/400x400/c62828/ffffff?text=Gaming+Mouse"],
    rating: 3.5,
    reviewsCount: Number,
  },
  {
    title: "Laptop Sleeve",
    price: 999,
    category: "Accessories",
    description: "Protective sleeve for laptops up to 15 inches.",
    images: ["https://placehold.co/400x400/37474f/ffffff?text=Laptop+Sleeve"],
    rating: 3.9,
    reviewsCount: Number,
  },
  {
    title: "Fitness Band",
    price: 1999,
    category: "Accessories",
    description: "Monitor your steps, sleep, and heart rate.",
    images: ["https://placehold.co/400x400/2e7d32/ffffff?text=Fitness+Band"],
    rating: 4.0,
    reviewsCount: Number,
  },
  {
    title: "Sunglasses",
    price: 1299,
    category: "Fashion",
    description: "Stylish sunglasses with UV protection.",
    images: ["https://placehold.co/400x400/f9a825/ffffff?text=Sunglasses"],
    rating: 3.7,
    reviewsCount: Number,
  },
  {
    title: "Water Bottle",
    price: 499,
    category: "Lifestyle",
    description: "Reusable stainless steel water bottle.",
    images: ["https://placehold.co/400x400/0277bd/ffffff?text=Water+Bottle"],
    rating: 3.9,
    reviewsCount: Number,
  },
  {
    title: "Notebook",
    price: 299,
    category: "Stationery",
    description: "A5 size notebook for daily notes.",
    images: ["https://placehold.co/400x400/546e7a/ffffff?text=Notebook"],
    rating: 3.4,
    reviewsCount: Number,
  },
  {
    title: "Desk Lamp",
    price: 1599,
    category: "Home",
    description: "LED desk lamp with adjustable brightness.",
    images: ["https://placehold.co/400x400/ff8f00/ffffff?text=Desk+Lamp"],
    rating: 2.8,
    reviewsCount: Number,
  },
  {
    title: "Phone Stand",
    price: 399,
    category: "Accessories",
    description: "Adjustable stand for smartphones.",
    images: ["https://placehold.co/400x400/455a64/ffffff?text=Phone+Stand"],
    rating: 2.1,
    reviewsCount: Number,
  },
  {
    title: "Power Bank",
    price: 2199,
    category: "Electronics",
    description: "10000mAh power bank with fast charging.",
    images: ["https://placehold.co/400x400/1565c0/ffffff?text=Power+Bank"],
    rating: 4.3,
    reviewsCount: Number,
  },
  {
    title: "Keyboard",
    price: 1899,
    category: "Electronics",
    description: "Slim keyboard with comfortable keys.",
    images: ["https://placehold.co/400x400/263238/ffffff?text=Keyboard"],
    rating: 3.8,
    reviewsCount: Number,
  },
  {
    title: "Office Chair",
    price: 8999,
    category: "Furniture",
    description: "Ergonomic chair for home and office use.",
    images: ["https://placehold.co/400x400/424242/ffffff?text=Office+Chair"],
    rating: 4.4,
    reviewsCount: Number,
  },
  {
    title: "Wrist Wallet",
    price: 699,
    category: "Accessories",
    description: "Compact wrist wallet for essentials.",
    images: ["https://placehold.co/400x400/ad1457/ffffff?text=Wrist+Wallet"],
    rating: 3.3,
    reviewsCount: Number,
  },
  {
    title: "Travel Duffel Bag",
    price: 2799,
    category: "Bags",
    description: "Spacious duffel bag for short trips.",
    images: ["https://placehold.co/400x400/004d40/ffffff?text=Travel+Bag"],
    rating: 3.8,
    reviewsCount: Number,
  },
  {
    title: "Yoga Mat",
    price: 999,
    category: "Fitness",
    description: "Non-slip yoga mat for workouts.",
    images: ["https://placehold.co/400x400/689f38/ffffff?text=Yoga+Mat"],
    rating: 3.9,
    reviewsCount: Number,
  },
  {
    title: "Wireless Charger",
    price: 1599,
    category: "Electronics",
    description: "Fast wireless charging pad.",
    images: [
      "https://placehold.co/400x400/212121/ffffff?text=Wireless+Charger",
    ],
    rating: 4.2,
    reviewsCount: Number,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log("Existing products cleared");

    // Insert new products
    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error", error);
    process.exit(1);
  }
};

seedProducts();
