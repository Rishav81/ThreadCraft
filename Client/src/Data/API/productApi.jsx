import { productApi } from "./axios";

export const getProducts = (filters = {}) => {
  return productApi.get("/", {
    params: filters,
  });
};

export const searchProducts = (query, page = 1, limit = 30) => {
  return productApi.get("/search", {
    params: {
      q: query,
      page,
      limit,
    },
  });
};

export const createProduct = (formData) => {
  return productApi.post("/add-product", formData);
};

export const updateProduct = (id, productData) => {
  return productApi.put(`/${id}`, productData);
};

export const deleteProduct = (id) => {
  return productApi.delete(`/${id}`);
};

export const getSingleProduct = (id) => {
  return productApi.get(`/${id}`);
};

export const getMyProducts = () => {
  return productApi.get("/my-products");
};
