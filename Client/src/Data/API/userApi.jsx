import { userAuth } from "./axios";

export const getUserProfile = () => {
  return userAuth.get("/profile");
};
