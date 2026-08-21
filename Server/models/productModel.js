import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Basic
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },

    category: {
      type: String,
      required: true,
    },

    style: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
    },

    // Inventory
    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    // Images

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
      },
    ],

    // Variants
    sizes: [
      {
        type: String,
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    // Details
    material: String,

    fit: String,

    occasion: String,

    tags: [
      {
        type: String,
      },
    ],

    // Flags
    featured: {
      type: Boolean,
      default: false,
    },

    trending: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
