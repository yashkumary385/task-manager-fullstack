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

// ✅ Allowed frontend domains
const allowedOrigins = [
  "https://mytaskapp2025.vercel.app",
  "https://mytaskapp2025-git-master-yashkumary385-1183s-projects.vercel.app", // Vercel preview
];

// ✅ CORS setup - must be before any routes
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://mytaskapp2025.vercel.app",
      "https://mytaskapp2025-git-master-yashkumary385-1183s-projects.vercel.app"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// ✅ Respond to CORS preflight requests
// app.options("*", cors());

// Middleware
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
