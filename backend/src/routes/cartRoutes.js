import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// GET cart
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartQuantity);
router.delete("/remove/:productId", protect, removeFromCart);
router.post("/clear", protect, clearCart);

export default router;
