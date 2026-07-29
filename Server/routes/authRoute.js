import express from "express";
import { registerAccount } from "../controllers/AuthController.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", registerAccount);

export default AuthRouter;
