import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/me", protect, getUserProfile);

export default userRouter;
