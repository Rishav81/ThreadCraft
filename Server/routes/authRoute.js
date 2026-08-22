import express from "express";
import {
  loginAccount,
  logoutAccount,
  registerAccount,
} from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", upload.single("profileImage"), registerAccount);
AuthRouter.post("/login", loginAccount);
AuthRouter.post("/logout", logoutAccount);

export default AuthRouter;
