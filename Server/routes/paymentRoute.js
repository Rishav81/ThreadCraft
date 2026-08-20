import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const paymentRouter = express.Router();

// ============================================================
// CREATE RAZORPAY ORDER
// POST /api/payment/create
// ============================================================

paymentRouter.post("/create", protect, createPaymentOrder);

// ============================================================
// VERIFY RAZORPAY PAYMENT
// POST /api/payment/verify
// ============================================================

paymentRouter.post("/verify", protect, verifyPayment);

export default paymentRouter;
