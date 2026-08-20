import { cartApi } from "./axios";

export const getCart = async () => {
  const response = await cartApi.get("/");
  return response.data;
};

export const addCartItem = async (productId, size, quantity = 1) => {
  const response = await cartApi.post("/", {
    productId,
    size,
    quantity,
  });

  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await cartApi.put(`/${itemId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await cartApi.delete(`/${itemId}`);

  return response.data;
};
