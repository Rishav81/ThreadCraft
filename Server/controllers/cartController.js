import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// ==========================================
// GET CART
// ==========================================

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    return res.status(200).json({
      success: true,
      cart: cart || {
        items: [],
      },
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

// ==========================================
// ADD TO CART
// ==========================================

export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product and size are required",
      });
    }

    const requestedQuantity = Number(quantity);

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    // ------------------------------------------
    // FIND PRODUCT
    // ------------------------------------------

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    if (requestedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }

    // ------------------------------------------
    // FIND USER CART
    // ------------------------------------------

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    // ------------------------------------------
    // CREATE CART
    // ------------------------------------------

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [
          {
            product: productId,
            size,
            quantity: requestedQuantity,
          },
        ],
      });
    } else {
      // ----------------------------------------
      // FIND EXISTING PRODUCT + SIZE
      // ----------------------------------------

      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === size,
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + requestedQuantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: "Requested quantity exceeds available stock",
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          product: productId,
          size,
          quantity: requestedQuantity,
        });
      }
    }

    // ------------------------------------------
    // SAVE
    // ------------------------------------------

    await cart.save();

    // Populate product details for frontend
    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};

// ==========================================
// UPDATE CART QUANTITY
// ==========================================

export const updateCartQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const requestedQuantity = Number(quantity);

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    // ------------------------------------------
    // FIND CART
    // ------------------------------------------

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ------------------------------------------
    // FIND CART ITEM
    // ------------------------------------------

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // ------------------------------------------
    // FIND PRODUCT
    // ------------------------------------------

    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ------------------------------------------
    // STOCK VALIDATION
    // ------------------------------------------

    if (requestedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock",
      });
    }

    // ------------------------------------------
    // UPDATE
    // ------------------------------------------

    item.quantity = requestedQuantity;

    await cart.save();

    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};

// ==========================================
// REMOVE ONE CART ITEM
// ==========================================

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    // ------------------------------------------
    // FIND CART
    // ------------------------------------------

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ------------------------------------------
    // FIND ITEM
    // ------------------------------------------

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // ------------------------------------------
    // REMOVE ONLY THIS ITEM
    // ------------------------------------------

    item.deleteOne();

    await cart.save();

    await cart.populate("items.product");

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });
  }
};
