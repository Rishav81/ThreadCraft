import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;
const api_url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: `${api_url}/auth`,
  withCredentials: true,
});

export const userAuth = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export const productApi = axios.create({
  baseURL: `${api_url}/products`,
  withCredentials: true,
});

export const cartApi = axios.create({
  baseURL: `${api_url}/cart`,
  withCredentials: true,
});

export const orderApi = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export const paymentApi = axios.create({
  baseURL: `${api_url}/payment`,
  withCredentials: true,
});

export const wishlistApi = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export default api;
