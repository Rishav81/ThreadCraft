import { orderApi } from "./axios";

// ============================================================
// CREATE ORDER
// POST /api/orders
// ============================================================

export const createOrder = async (orderData) => {
  try {
    const response = await orderApi.post("/orders", orderData);

    return response.data;
  } catch (error) {
    console.error(
      "Create Order API Error:",
      error.response?.data?.message || error.message,
    );

    throw error;
  }
};

// ============================================================
// GET MY ORDERS
// GET /api/orders
// ============================================================

export const getMyOrders = async () => {
  try {
    const response = await orderApi.get("/orders");

    return response.data;
  } catch (error) {
    console.error(
      "Get My Orders API Error:",
      error.response?.data?.message || error.message,
    );

    throw error;
  }
};
