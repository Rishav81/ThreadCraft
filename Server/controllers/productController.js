import Product from "../models/productModel.js";
import uploadToCloudinary from "../utils/uploadCloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      sku,
      gender,
      category,
      style,
      description,
      price,
      oldPrice,
      discount,
      stock,
      sizes,
      colors,
      material,
      fit,
      occasion,
      tags,
      featured,
      trending,
      bestSeller,
      status,
    } = req.body;

    // =========================================================
    // VALIDATION
    // =========================================================

    if (
      !name ||
      !gender ||
      !category ||
      !description ||
      !price ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // =========================================================
    // UPLOAD IMAGES
    // =========================================================

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          url: imageUrl,
        });
      }
    }

    // =========================================================
    // PARSE JSON FIELDS SAFELY
    // =========================================================

    let parsedSizes = [];
    let parsedColors = [];
    let parsedTags = [];

    try {
      parsedSizes = sizes ? JSON.parse(sizes) : [];
      parsedColors = colors ? JSON.parse(colors) : [];
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes, colors, or tags format.",
      });
    }

    // =========================================================
    // CREATE PRODUCT
    // =========================================================

    const product = await Product.create({
      name,
      brand,
      sku,

      gender,
      category,
      style,
      description,

      price,
      oldPrice,
      discount,

      stock,

      images: uploadedImages,

      sizes: parsedSizes,
      colors: parsedColors,

      material,
      fit,
      occasion,
      tags: parsedTags,

      featured: featured === "true",
      trending: trending === "true",
      bestSeller: bestSeller === "true",

      status,

      // Logged-in user
      seller: req.user.id,
    });

    // =========================================================
    // RESPONSE
    // =========================================================

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({ status: "published" });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const singleProduct = async (req, res) => {
  try {
    //1.getting id from url
    const { id } = req.params;

    //2.search product by productID
    const product = await Product.findById(id);

    //3.check is product available
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    //4.Send product response
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // =======================================================
    // FIND PRODUCT
    // =======================================================

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // =======================================================
    // CHECK OWNER
    // =======================================================

    if (product.seller.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this product.",
      });
    }

    // =======================================================
    // PARSE ARRAYS
    // =======================================================

    let parsedSizes = [];
    let parsedColors = [];
    let parsedTags = [];
    let existingImages = [];

    try {
      parsedSizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

      parsedColors = req.body.colors ? JSON.parse(req.body.colors) : [];

      parsedTags = req.body.tags ? JSON.parse(req.body.tags) : [];

      existingImages = req.body.existingImages
        ? JSON.parse(req.body.existingImages)
        : [];
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data format.",
      });
    }

    // =======================================================
    // UPLOAD NEW IMAGES
    // =======================================================

    const newUploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer);

        newUploadedImages.push({
          url: imageUrl,
        });
      }
    }

    // =======================================================
    // FINAL IMAGES
    // =======================================================

    const finalImages = [...existingImages, ...newUploadedImages];

    // =======================================================
    // MAX IMAGE CHECK
    // =======================================================

    if (finalImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: "A product can have a maximum of 5 images.",
      });
    }

    if (finalImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product must have at least one image.",
      });
    }

    // =======================================================
    // UPDATE
    // =======================================================

    product.name = req.body.name;

    product.brand = req.body.brand;

    product.sku = req.body.sku;

    product.gender = req.body.gender;

    product.category = req.body.category;

    product.style = req.body.style;

    product.description = req.body.description;

    product.price = req.body.price;

    product.oldPrice = req.body.oldPrice;

    product.discount = req.body.discount;

    product.stock = req.body.stock;

    product.images = finalImages;

    product.sizes = parsedSizes;

    product.colors = parsedColors;

    product.material = req.body.material;

    product.fit = req.body.fit;

    product.occasion = req.body.occasion;

    product.tags = parsedTags;

    product.featured = req.body.featured === "true";

    product.trending = req.body.trending === "true";

    product.bestSeller = req.body.bestSeller === "true";

    product.status = req.body.status || "draft";

    const updatedProduct = await product.save();

    // =======================================================
    // RESPONSE
    // =======================================================

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //1.get id from url
    const { id } = req.params;

    //2. update produt
    const deleteProduct = await Product.findByIdAndDelete(id);

    //3.check is product available
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    //4.Send product response
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
