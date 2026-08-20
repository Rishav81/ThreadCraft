import { paymentApi } from "./axios";

// ============================================================
// CREATE RAZORPAY ORDER
// ============================================================

export const createPaymentOrder = async (orderId) => {
  try {
    const response = await paymentApi.post("/create", {
      orderId,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Create Payment Order API Error:",
      error.response?.data?.message || error.message,
    );

    throw error;
  }
};

// ============================================================
// VERIFY RAZORPAY PAYMENT
// ============================================================

export const verifyPayment = async (paymentData) => {
  try {
    const response = await paymentApi.post("/verify", paymentData);

    return response.data;
  } catch (error) {
    console.error(
      "Verify Payment API Error:",
      error.response?.data?.message || error.message,
    );

    throw error;
  }
};
