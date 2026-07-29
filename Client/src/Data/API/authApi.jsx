import { auth } from "./axios";

export const registerAccount = (userData) => {
  return auth.post("/register", userData);
};
