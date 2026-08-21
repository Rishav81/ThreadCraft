import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getMyProducts,
  singleProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  protect,
  upload.array("images", 5),

  createProduct,
);
productRouter.get("/", protect, getAllProduct);
productRouter.get("/my-products", protect, getMyProducts);
productRouter.get("/:id", protect, singleProduct);
productRouter.put("/:id", protect, upload.array("images", 5), updateProduct);
productRouter.delete("/:id", protect, deleteProduct);

export default productRouter;
