import "dotenv/config";
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import AuthRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import wishListRouter from "./routes/wishListRoute.js";

const app = express();

connectDB();

//middleware
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//Test Route
app.get("/", (req, res) => res.send("Thread Craft is running!"));
app.use("/api/products", productRouter);
app.use("/api/auth", AuthRouter);
app.use("/api", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api", wishListRouter);

//Server PORT
const PORT = process.env.PORT || 5000;

//Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
