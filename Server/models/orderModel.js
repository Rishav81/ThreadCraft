import mongoose from "mongoose";

// ============================================================
// ORDER ITEM SCHEMA
// ============================================================

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Snapshot of product information at purchase time
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

// ============================================================
// ORDER SCHEMA
// ============================================================

const orderSchema = new mongoose.Schema(
  {
    // ========================================================
    // USER
    // ========================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ========================================================
    // ORDER NUMBER
    // Customer-friendly order ID
    // ========================================================

    orderNumber: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },

    // ========================================================
    // CUSTOMER INFORMATION
    // Snapshot at the time of order
    // ========================================================

    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // ========================================================
    // SHIPPING ADDRESS
    // Snapshot at the time of order
    // ========================================================

    shippingAddress: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // ========================================================
    // ORDER ITEMS
    // ========================================================

    items: {
      type: [orderItemSchema],

      required: true,

      validate: {
        validator: function (items) {
          return Array.isArray(items) && items.length > 0;
        },

        message: "Order must contain at least one item.",
      },
    },

    // ========================================================
    // ORDER SUMMARY
    // ========================================================

    orderSummary: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },

      shipping: {
        type: Number,
        required: true,
        min: 0,
      },

      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    // ========================================================
    // PAYMENT
    // ========================================================

    paymentMethod: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true,
    },

    // ========================================================
    // ORDER STATUS
    // ========================================================

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    // ========================================================
    // RAZORPAY
    // ========================================================

    razorpayOrderId: {
      type: String,
      default: null,
      index: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
      index: true,
    },
  },

  {
    timestamps: true,
  },
);

// ============================================================
// GENERATE CUSTOMER-FRIENDLY ORDER NUMBER
// ============================================================

orderSchema.pre("validate", async function () {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();

    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    this.orderNumber = `TC-${timestamp}-${random}`;
  }
});

// ============================================================
// MODEL
// ============================================================

const Order = mongoose.model("Order", orderSchema);

export default Order;
