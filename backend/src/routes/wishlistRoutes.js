import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getWishList,
  toggleWishList,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", protect, getWishList);
router.post("/toggle", protect, toggleWishList);

export default router;