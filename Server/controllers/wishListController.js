// ============================================================
// GET MY WISHLIST
// ============================================================

import Wishlist from "../models/wishListModel.js";
import Product from "../models/productModel.js";

export const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    }).populate("products");

    // User doesn't have a wishlist yet
    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlist: {
          user: req.user.id,
          products: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get wishlist",
    });
  }
};

// ============================================================
// ADD PRODUCT TO WISHLIST
// ============================================================

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // --------------------------------------------------------
    // Validate productId
    // --------------------------------------------------------

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // --------------------------------------------------------
    // Check product exists
    // --------------------------------------------------------

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // --------------------------------------------------------
    // Find user's wishlist
    // --------------------------------------------------------

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    // --------------------------------------------------------
    // Create wishlist if user doesn't have one
    // --------------------------------------------------------

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      });
    } else {
      // ------------------------------------------------------
      // Check if product already exists
      // ------------------------------------------------------

      const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId.toString(),
      );

      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message: "Product already exists in wishlist",
        });
      }

      // ------------------------------------------------------
      // Add product
      // ------------------------------------------------------

      wishlist.products.push(productId);

      await wishlist.save();
    }

    // --------------------------------------------------------
    // Return updated wishlist
    // --------------------------------------------------------

    await wishlist.populate("products");

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Add Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
    });
  }
};

// ============================================================
// REMOVE PRODUCT FROM WISHLIST
// ============================================================

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // --------------------------------------------------------
    // Find user's wishlist
    // --------------------------------------------------------

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // --------------------------------------------------------
    // Check product exists in wishlist
    // --------------------------------------------------------

    const productExists = wishlist.products.some(
      (id) => id.toString() === productId.toString(),
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    // --------------------------------------------------------
    // Remove product
    // --------------------------------------------------------

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString(),
    );

    await wishlist.save();

    // --------------------------------------------------------
    // Populate updated wishlist
    // --------------------------------------------------------

    await wishlist.populate("products");

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
    });
  }
};

// ============================================================
// CLEAR WISHLIST
// ============================================================

export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Clear Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
    });
  }
};
