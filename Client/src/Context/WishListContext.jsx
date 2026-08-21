import { createContext, useContext, useEffect, useState } from "react";
import {
  addWishlistItem,
  clearWishlistItems,
  getWishlist,
  removeWishlistItem,
} from "../Data/API/wishlistApi";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================================================
  // GET WISHLIST
  // ============================================================

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWishlist();

      setWishlistItems(data.wishlist?.products || []);
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);

      setError(error.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ADD TO WISHLIST
  // ============================================================

  const addToWishlist = async (productId) => {
    try {
      setError(null);

      const data = await addWishlistItem(productId);

      setWishlistItems(data.wishlist?.products || []);

      return data;
    } catch (error) {
      console.error("Add Wishlist Error:", error);

      setError(
        error.response?.data?.message || "Failed to add product to wishlist",
      );

      throw error;
    }
  };

  // ============================================================
  // REMOVE FROM WISHLIST
  // ============================================================

  const removeFromWishlist = async (productId) => {
    try {
      setError(null);

      const data = await removeWishlistItem(productId);

      setWishlistItems(data.wishlist?.products || []);

      return data;
    } catch (error) {
      console.error("Remove Wishlist Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to remove product from wishlist",
      );

      throw error;
    }
  };

  // ============================================================
  // CLEAR WISHLIST
  // ============================================================

  const clearWishlist = async () => {
    try {
      setError(null);

      const data = await clearWishlistItems();

      setWishlistItems(data.wishlist?.products || []);

      return data;
    } catch (error) {
      console.error("Clear Wishlist Error:", error);

      setError(error.response?.data?.message || "Failed to clear wishlist");

      throw error;
    }
  };

  // ============================================================
  // CHECK IF PRODUCT IS IN WISHLIST
  // ============================================================

  const isInWishlist = (productId) => {
    return wishlistItems.some((product) => product._id === productId);
  };

  // ============================================================
  // FETCH WISHLIST WHEN CONTEXT LOADS
  // ============================================================

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ============================================================
  // CONTEXT VALUE
  // ============================================================

  const value = {
    wishlistItems,
    loading,
    error,

    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// ============================================================
// CUSTOM HOOK
// ============================================================

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};
