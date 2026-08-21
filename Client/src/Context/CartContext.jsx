import { createContext, useContext, useEffect, useState } from "react";

import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../Data/API/cartApi";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // NORMALIZE CART ITEMS
  // =========================================================

  const normalizeCartItems = (items = []) => {
    return items
      .filter((item) => item?.product)
      .map((item) => ({
        // MongoDB Cart Item ID
        cartItemId: item._id,

        // Product ID
        productId: item.product._id,

        // Product information
        name: item.product.name || "",
        price: Number(item.product.price || 0),
        image: item.product.images?.[0]?.url || "",
        stock: Number(item.product.stock || 0),
        brand: item.product.brand || "",
        category: item.product.category || "",

        // Cart information
        size: item.size || "",
        quantity: Number(item.quantity || 1),
      }));
  };

  // =========================================================
  // SET CART FROM API RESPONSE
  // =========================================================

  const setCartFromResponse = (data) => {
    const items = data?.cart?.items || [];

    setCartItems(normalizeCartItems(items));
  };

  // =========================================================
  // GET CART
  // =========================================================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCartFromResponse(data);

      return data;
    } catch (error) {
      console.error(
        "Fetch Cart Error:",
        error.response?.data?.message || error.message,
      );

      // IMPORTANT:
      // Don't empty the cart when there is only a network/server error.
      return null;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const addToCart = async (product, selectedSize, quantity = 1) => {
    try {
      if (!product?._id) {
        throw new Error("Product ID is required");
      }

      if (!selectedSize) {
        throw new Error("Product size is required");
      }

      const data = await addCartItem(product._id, selectedSize, quantity);

      setCartFromResponse(data);

      return data;
    } catch (error) {
      console.error(
        "Add To Cart Error:",
        error.response?.data?.message || error.message,
      );

      throw error;
    }
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      if (!cartItemId) {
        throw new Error("Cart item ID is required");
      }

      if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
      }

      const data = await updateCartItem(cartItemId, quantity);

      setCartFromResponse(data);

      return data;
    } catch (error) {
      console.error(
        "Update Quantity Error:",
        error.response?.data?.message || error.message,
      );

      throw error;
    }
  };

  // =========================================================
  // REMOVE SINGLE CART ITEM
  // =========================================================

  const removeFromCart = async (cartItemId) => {
    try {
      if (!cartItemId) {
        throw new Error("Cart item ID is required");
      }

      const data = await removeCartItem(cartItemId);

      setCartFromResponse(data);

      return data;
    } catch (error) {
      console.error(
        "Remove Cart Item Error:",
        error.response?.data?.message || error.message,
      );

      throw error;
    }
  };

  // =========================================================
  // CART COUNT
  // =========================================================

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // =========================================================
  // CART TOTAL
  // =========================================================

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // =========================================================
  // FETCH CART ON APP LOAD
  // =========================================================

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {
    cartItems,
    loading,

    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,

    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// =========================================================
// CUSTOM HOOK
// =========================================================

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
