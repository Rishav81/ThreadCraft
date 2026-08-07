import { auth } from "./axios";

export const registerAccount = (userData) => {
  return auth.post("/register", userData);
};
export const loginAccount = (formData) => {
  return auth.post("/login", formData);
};
export const logoutAccount = () => {
  return auth.post("/logout");
};
