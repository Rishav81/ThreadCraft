import { productApi } from "./axios";

export const getProducts = (filters = {}) => {
  return productApi.get("/", {
    params: filters,
  });
};

export const createProduct = (formData) => {
  return productApi.post("/add-product", formData);
};
