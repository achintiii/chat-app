import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from './lib/socket.js';


dotenv.config();



// Middleware
app.use(express.json()); // To parse incoming JSON payloads
app.use(cookieParser()); // To parse cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Hello, MERN stack backend!");
});
// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("Socket server running on port 5001");
  connectDB();
});



