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

// Middleware
// import cors from "cors";

// ✅ Place BEFORE any routes
const allowedOrigins = ["https://mytaskapp2025.vercel.app"];

app.use(cors({
  origin: "https://mytaskapp2025.vercel.app",
  credentials: true,
}));


app.use(express.json());


// Health check
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.route.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/", userRoutes);
app.use("/api/tasks", taskRoutes);

// Uploads directory setup
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ 'uploads/' folder created");
}
app.use("/uploads", express.static(uploadDir));

// Connect to DB and start server
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connected");
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}
