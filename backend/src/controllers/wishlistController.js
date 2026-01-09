import User from "../models/User.js";
import Product from "../models/Product.js";

export const getWishList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    const wishlist = user.wishlist.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      rating: product.rating,
    }));

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

export const toggleWishList = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product not found" });
    }

    // ensure product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);

    const index = user.wishlist.findIndex((id) => id.toString() === productId);

    if (index > -1) {
      //product exists -> remove
      user.wishlist.splice(index, 1);
    } else {
      //product not exists -> add
      user.wishlist.push(productId);
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate("wishlist");

    const wishlist = updatedUser.wishlist.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      rating: product.rating,
    }));

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update wishlist" });
  }
};
