import { wishlistApi } from "./axios";

export const getWishlist = async () => {
  const response = await wishlistApi.get("/wishlist");
  return response.data;
};

export const addWishlistItem = async (productId) => {
  const response = await wishlistApi.post("/wishlist", {
    productId,
  });

  return response.data;
};

export const removeWishlistItem = async (productId) => {
  const response = await wishlistApi.delete(`/wishlist/${productId}`);

  return response.data;
};

export const clearWishlistItems = async () => {
  const response = await wishlistApi.delete(`/wishlist`);

  return response.data;
};
