import { productApi } from "./axios";

export const getProducts = () => {
  return productApi.get("/");
};

export const createProduct = (formData) => {
  return productApi.post("/add-product", formData);
};
