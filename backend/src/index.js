import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
app.use("/api/auth", authRoutes);

// Middleware
//app.use(cors());
app.use(express.json());



// API Routes
app.get("/", (req, res) => {
  res.send("Hello, MERN stack backend!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  connectDB();
});
