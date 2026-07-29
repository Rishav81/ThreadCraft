import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    //1.Getting data from body
    const data = req.body;

    //2.Checking all required field
    if (!data.name || !data.price || !data.category || !data.stock) {
      return res.status(400).json({
        success: false,
        message: "All field required.",
      });
    }

    //3.Creating new product
    const product = new Product(data);

    //4.Saving to DB
    await product.save();

    //5.Sending Response
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

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
    //1.get id from url
    const { id } = req.params;

    //2. update produt
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    //3.check is product available
    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Updated",
      });
    }
    //4.Send product response
    res.status(200).json({
      success: true,
      Product: updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //1.get id from url
    const { id } = req.params;

    //2. update produt
    const deleteProduct = await Product.findByIdAndDelete(id, req.body);

    //3.check is product available
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Updated",
      });
    }
    //4.Send product response
    res.status(200).json({
      success: true,
      message: "Items is deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
