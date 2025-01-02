import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON payloads
app.use(cookieParser()); // To parse cookies


// API Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello, MERN stack backend!");
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});
