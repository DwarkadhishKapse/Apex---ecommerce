import User from "../models/User.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    //1. get user with populated cart product
    const user = await User.findById(req.user._id).populate("cart.product");

    // shape cart for frontend
    const cart = user.cart.map((item) => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0],
        rating: item.product.rating,
      },
      quantity: item.quantity,
    }));

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate productId
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get user
    const user = await User.findById(req.user._id);

    // Check if product already in cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      // Product exists -> increase quantity
      cartItem.quantity += quantity;
    } else {
      // product not in cart -> add new item
      user.cart.push({
        product: productId,
        quantity,
      });
    }

    // save user
    await user.save();

    // re-fetch populated cart
    const updatedCart = await User.findById(req.user._id).populate(
      "cart.product"
    );

    // Shape response
    const cart = updatedCart.cart.map((item) => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0],
        rating: item.product.rating,
      },
      quantity: item.quantity,
    }));

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    if (!productId || !action) {
      return res
        .status(400)
        .json({ message: "Product Id and action are required" });
    }

    const user = await User.findById(req.user._id);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "increase") {
      cartItem.quantity += 1;
    } else if (action === "decrease") {
      cartItem.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // remove item if quantity <= 0
    user.cart = user.cart.filter((item) => item.quantity > 0);

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product"
    );

    const cart = updatedUser.cart.map((item) => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0],
        rating: item.product.rating,
      },
      quantity: item.quantity,
    }));

    res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    const initialLength = user.cart.length;

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product"
    );

    const cart = updatedUser.cart.map((item) => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images[0],
        rating: item.product.rating,
      },
      quantity: item.quantity,
    }));

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];

    await user.save();

    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
