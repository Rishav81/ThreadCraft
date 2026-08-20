import express from "express";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get("/", protect, getCart);

cartRouter.post("/", protect, addToCart);

cartRouter.put("/:itemId", protect, updateCartQuantity);

cartRouter.delete("/:itemId", protect, removeFromCart);

export default cartRouter;
