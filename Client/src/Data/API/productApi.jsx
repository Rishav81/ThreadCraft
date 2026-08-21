import { productApi } from "./axios";

// =========================================================
// GET ALL PRODUCTS
// =========================================================

export const getProducts = (filters = {}) => {
  return productApi.get("/", {
    params: filters,
  });
};

// =========================================================
// CREATE PRODUCT
// =========================================================

export const createProduct = (formData) => {
  return productApi.post("/add-product", formData);
};

// =========================================================
// UPDATE PRODUCT
// =========================================================

export const updateProduct = (id, productData) => {
  return productApi.put(`/${id}`, productData);
};

// =========================================================
// DELETE PRODUCT
// =========================================================

export const deleteProduct = (id) => {
  return productApi.delete(`/${id}`);
};

// =========================================================
// SINGLE PRODUCT
// =========================================================

export const getSingleProduct = (id) => {
  return productApi.get(`/${id}`);
};

// =========================================================
// MY PRODUCTS
// =========================================================

export const getMyProducts = () => {
  return productApi.get("/my-products");
};
