import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: "http://localhost/api/auth",
  withCredentials: true,
});

export const userAuth = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export const productApi = axios.create({
  baseURL: "http://localhost/api/products",
  withCredentials: true,
});

export const cartApi = axios.create({
  baseURL: "http://localhost/api/cart",
  withCredentials: true,
});
export const orderApi = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export const paymentApi = axios.create({
  baseURL: "http://localhost/api/payment",
  withCredentials: true,
});
export const wishlistApi = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export default api;
