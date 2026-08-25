import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// const api_url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,

  withCredentials: true,
});

export const auth = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

export const userAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const productApi = axios.create({
  baseURL: `${API_URL}/products`,
  withCredentials: true,
});

export const cartApi = axios.create({
  baseURL: `${API_URL}/cart`,
  withCredentials: true,
});

export const orderApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const paymentApi = axios.create({
  baseURL: `${API_URL}/payment`,
  withCredentials: true,
});

export const wishlistApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
