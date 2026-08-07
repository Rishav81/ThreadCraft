import express from "express";
import {
  loginAccount,
  logoutAccount,
  registerAccount,
} from "../controllers/AuthController.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", registerAccount);
AuthRouter.post("/login", loginAccount);
AuthRouter.post("/logout", logoutAccount);

export default AuthRouter;
