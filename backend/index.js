import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  "https://mytaskapp2025.vercel.app",
  "https://mytaskapp2025-git-master-yashkumary385-1183s-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // ✅ This handles all CORS including preflight

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: " Backend is working!" });
});

import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.route.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/", userRoutes);
app.use("/api/tasks", taskRoutes);

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(" 'uploads/' folder created");
}
app.use("/uploads", express.static(uploadDir));

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(" MongoDB connected");
      app.listen(PORT, "0.0.0.0", () => {
        console.log(` Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(" MongoDB connection error:", err.message);
    });
}
