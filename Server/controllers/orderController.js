import mongoose from "mongoose";

import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// ============================================================
// CREATE ORDER
// POST /api/orders
// Supports:
// 1. Buy Now
// 2. Cart Checkout
// ============================================================

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;

    const {
      customer,
      shippingAddress,
      paymentMethod,
      selectedItemIds = [],
      items = [],
    } = req.body;

    // ========================================================
    // 1. AUTHENTICATION
    // ========================================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================================
    // 2. PAYMENT METHOD
    // ========================================================

    if (paymentMethod !== "razorpay") {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // ========================================================
    // 3. CUSTOMER VALIDATION
    // ========================================================

    if (
      !customer?.fullName?.trim() ||
      !customer?.email?.trim() ||
      !customer?.phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete customer information is required.",
      });
    }

    // ========================================================
    // 4. SHIPPING ADDRESS VALIDATION
    // ========================================================

    if (
      !shippingAddress?.address?.trim() ||
      !shippingAddress?.city?.trim() ||
      !shippingAddress?.state?.trim() ||
      !shippingAddress?.pincode?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete shipping address is required.",
      });
    }

    // ========================================================
    // 5. DETERMINE CHECKOUT MODE
    // ========================================================

    const isBuyNow = Array.isArray(items) && items.length > 0;

    const isCartCheckout =
      Array.isArray(selectedItemIds) && selectedItemIds.length > 0;

    // User must provide one checkout source.
    if (!isBuyNow && !isCartCheckout) {
      return res.status(400).json({
        success: false,
        message: "No items selected for checkout.",
      });
    }

    // Prevent accidentally sending both.
    if (isBuyNow && isCartCheckout) {
      return res.status(400).json({
        success: false,
        message: "Invalid checkout request.",
      });
    }

    // ========================================================
    // 6. ORDER ITEMS
    // ========================================================

    let orderItems = [];

    // ========================================================
    // BUY NOW
    // ========================================================

    if (isBuyNow) {
      // ------------------------------------------------------
      // Currently Buy Now should contain one item.
      // ------------------------------------------------------

      if (items.length !== 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid Buy Now request.",
        });
      }

      const buyNowItem = items[0];

      const { productId, size, quantity } = buyNowItem;

      // ------------------------------------------------------
      // PRODUCT ID
      // ------------------------------------------------------

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      // ------------------------------------------------------
      // SIZE
      // ------------------------------------------------------

      if (!size?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Product size is required.",
        });
      }

      // ------------------------------------------------------
      // QUANTITY
      // ------------------------------------------------------

      const parsedQuantity = Number(quantity);

      if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity.",
        });
      }

      // ------------------------------------------------------
      // GET PRODUCT
      // ------------------------------------------------------

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      // ------------------------------------------------------
      // STOCK CHECK
      // ------------------------------------------------------

      if (product.stock <= 0) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock.`,
        });
      }

      if (parsedQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} unit(s) of ${product.name} are available.`,
        });
      }

      // ------------------------------------------------------
      // SIZE AVAILABILITY CHECK
      // ------------------------------------------------------

      if (
        Array.isArray(product.sizes) &&
        product.sizes.length > 0 &&
        !product.sizes.includes(size)
      ) {
        return res.status(400).json({
          success: false,
          message: `${size} size is not available for ${product.name}.`,
        });
      }

      // ------------------------------------------------------
      // CREATE ORDER ITEM SNAPSHOT
      // ------------------------------------------------------

      orderItems.push({
        product: product._id,

        name: product.name,

        image: product.images?.[0]?.url || "",

        price: Number(product.price),

        size: size.trim(),

        quantity: parsedQuantity,
      });
    }

    // ========================================================
    // CART CHECKOUT
    // ========================================================

    if (isCartCheckout) {
      // ------------------------------------------------------
      // REMOVE DUPLICATES
      // ------------------------------------------------------

      const uniqueSelectedItemIds = [...new Set(selectedItemIds)];

      // ------------------------------------------------------
      // VALIDATE CART ITEM IDs
      // ------------------------------------------------------

      const invalidId = uniqueSelectedItemIds.some(
        (id) => !mongoose.Types.ObjectId.isValid(id),
      );

      if (invalidId) {
        return res.status(400).json({
          success: false,
          message: "Invalid cart item ID.",
        });
      }

      // ------------------------------------------------------
      // GET USER CART
      // ------------------------------------------------------

      const cart = await Cart.findOne({
        user: userId,
      }).populate("items.product");

      if (!cart || !cart.items?.length) {
        return res.status(400).json({
          success: false,
          message: "Your cart is empty.",
        });
      }

      // ------------------------------------------------------
      // FIND SELECTED ITEMS
      // ------------------------------------------------------

      const selectedItems = cart.items.filter((cartItem) =>
        uniqueSelectedItemIds.includes(cartItem._id.toString()),
      );

      // ------------------------------------------------------
      // SECURITY CHECK
      // ------------------------------------------------------

      if (selectedItems.length !== uniqueSelectedItemIds.length) {
        return res.status(400).json({
          success: false,
          message: "One or more selected cart items are invalid.",
        });
      }

      // ------------------------------------------------------
      // BUILD ORDER ITEMS
      // ------------------------------------------------------

      for (const cartItem of selectedItems) {
        const product = cartItem.product;

        // ----------------------------------------------------
        // PRODUCT EXISTS
        // ----------------------------------------------------

        if (!product) {
          return res.status(400).json({
            success: false,
            message: "One of the selected products is no longer available.",
          });
        }

        // ----------------------------------------------------
        // STOCK
        // ----------------------------------------------------

        if (product.stock <= 0) {
          return res.status(400).json({
            success: false,
            message: `${product.name} is out of stock.`,
          });
        }

        if (cartItem.quantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${product.stock} unit(s) of ${product.name} are available.`,
          });
        }

        // ----------------------------------------------------
        // SIZE
        // ----------------------------------------------------

        if (!cartItem.size) {
          return res.status(400).json({
            success: false,
            message: `Size is required for ${product.name}.`,
          });
        }

        // ----------------------------------------------------
        // SIZE AVAILABILITY
        // ----------------------------------------------------

        if (
          Array.isArray(product.sizes) &&
          product.sizes.length > 0 &&
          !product.sizes.includes(cartItem.size)
        ) {
          return res.status(400).json({
            success: false,
            message: `${cartItem.size} size is not available for ${product.name}.`,
          });
        }

        // ----------------------------------------------------
        // ORDER ITEM SNAPSHOT
        // ----------------------------------------------------

        orderItems.push({
          product: product._id,

          name: product.name,

          image: product.images?.[0]?.url || "",

          price: Number(product.price),

          size: cartItem.size,

          quantity: Number(cartItem.quantity),
        });
      }
    }

    // ========================================================
    // FINAL ORDER ITEM CHECK
    // ========================================================

    if (!orderItems.length) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item.",
      });
    }

    // ========================================================
    // CALCULATE TOTALS
    // ========================================================
    // IMPORTANT:
    // Never trust totals from frontend.
    // Calculate them from database product prices.
    // ========================================================

    const subtotal = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const shipping = subtotal >= 999 ? 0 : 99;

    const total = subtotal + shipping;

    // ========================================================
    // CREATE MONGODB ORDER
    // ========================================================

    const order = await Order.create({
      user: userId,

      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
      },

      shippingAddress: {
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
      },

      items: orderItems,

      orderSummary: {
        subtotal,
        shipping,
        total,
      },

      paymentMethod,

      paymentStatus: "pending",

      orderStatus: "pending",
    });

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message: "Order created successfully.",

      order: {
        _id: order._id,

        orderNumber: order.orderNumber,

        user: order.user,

        items: order.items,

        orderSummary: order.orderSummary,

        customer: order.customer,

        shippingAddress: order.shippingAddress,

        paymentMethod: order.paymentMethod,

        paymentStatus: order.paymentStatus,

        orderStatus: order.orderStatus,

        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};

// ============================================================
// GET MY ORDERS
// GET /api/orders
// ============================================================

export const getMyOrders = async (req, res) => {
  try {
    // ========================================================
    // AUTHENTICATED USER
    // ========================================================

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================================
    // GET USER ORDERS
    // ========================================================

    const orders = await Order.find({
      user: userId,
    })
      .populate({
        path: "items.product",
        select: "name brand price images sizes colors",
      })
      .sort({ createdAt: -1 });

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};
