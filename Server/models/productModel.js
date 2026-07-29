import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    style: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
        required: true,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      required: true,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    colors: [
      {
        type: String,
      },
    ],

    sizes: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      required: true,
    },

    badge: {
      type: String,
      required: true,
    },

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

    tags: [
      {
        type: String,
      },
    ],

    material: {
      type: String,
    },

    fit: {
      type: String,
    },

    occasion: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
