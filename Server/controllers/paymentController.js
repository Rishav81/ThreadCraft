import crypto from "crypto";

import razorpay from "../config/razorpay.js";
import Order from "../models/orderModel.js";

// ============================================================
// CREATE RAZORPAY ORDER
// POST /api/payment/create
// ============================================================

export const createPaymentOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body;

    // ========================================================
    // VALIDATE ORDER ID
    // ========================================================

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
      });
    }

    // ========================================================
    // FIND USER'S ORDER
    // ========================================================

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ========================================================
    // CHECK PAYMENT STATUS
    // ========================================================

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order is already paid.",
      });
    }

    // ========================================================
    // CHECK ORDER TOTAL
    // ========================================================

    const total = Number(order.orderSummary?.total);

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount.",
      });
    }

    // ========================================================
    // CREATE RAZORPAY ORDER
    // ========================================================

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",

      // Razorpay receipt should be a string
      receipt: order._id.toString(),
    });

    // ========================================================
    // SAVE RAZORPAY ORDER ID
    // ========================================================

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully.",

      razorpayOrderId: razorpayOrder.id,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      orderId: order._id,
    });
  } catch (error) {
    console.error("Create Payment Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order.",
    });
  }
};

// ============================================================
// VERIFY RAZORPAY PAYMENT
// POST /api/payment/verify
// ============================================================

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // ========================================================
    // VALIDATE PAYMENT DATA
    // ========================================================

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is incomplete.",
      });
    }

    // ========================================================
    // FIND USER'S ORDER
    // ========================================================

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ========================================================
    // CHECK ORDER PAYMENT STATE
    // ========================================================

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order payment has already been verified.",
      });
    }

    // ========================================================
    // VERIFY RAZORPAY ORDER ID
    // ========================================================

    if (!order.razorpayOrderId || order.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order ID does not match.",
      });
    }

    // ========================================================
    // GENERATE SIGNATURE
    // ========================================================

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // ========================================================
    // COMPARE SIGNATURE
    // ========================================================

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature),
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    // ========================================================
    // UPDATE ORDER
    // ========================================================

    order.paymentStatus = "paid";

    order.orderStatus = "confirmed";

    order.razorpayPaymentId = razorpay_payment_id;

    await order.save();

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      order,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed.",
    });
  }
};
