import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import AuthRouter from "./routes/authRoute.js";

dotenv.config();
const app = express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());

//Test Route
app.get("/", (req, res) => res.send("Thread Craft is running!"));
app.use("/api/products", productRouter);
app.use("/api/auth", AuthRouter);

//Server PORT
const PORT = process.env.PORT || 5000;

//Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
