import express from "express";

import {
  addToWishlist,
  clearWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../controllers/wishListController.js";
import { protect } from "../middleware/authMiddleware.js";
const wishListRouter = express.Router();

wishListRouter.get("/wishlist", protect, getMyWishlist);
wishListRouter.post("/wishlist", protect, addToWishlist);
wishListRouter.delete("/wishlist/:productId", protect, removeFromWishlist);
wishListRouter.delete("/wishlist", protect, clearWishlist);

export default wishListRouter;
