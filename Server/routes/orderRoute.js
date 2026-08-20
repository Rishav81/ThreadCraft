import express from "express";

import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Create order
orderRouter.post("/orders", protect, createOrder);
orderRouter.get("/orders", protect, getMyOrders);

export default orderRouter;
