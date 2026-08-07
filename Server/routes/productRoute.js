import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const productRouter = express.Router();

productRouter.post("/add-product", upload.array("images", 5), createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", singleProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
