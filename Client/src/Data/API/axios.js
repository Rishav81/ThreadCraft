import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

export const userAuth = axios.create({
  baseURL: "http://localhost:5000/api/profile",
  withCredentials: true,
});

export const productApi = axios.create({
  baseURL: "http://localhost:5000/api/products",
  withCredentials: true,
});

export default api;
