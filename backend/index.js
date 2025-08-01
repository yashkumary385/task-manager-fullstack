import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_DB_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use( "/uploads" , express.static("uploads"))

// AUTH ROUTES
import authRoutes from "./routes/auth.routes.js"
app.use('/api/auth',authRoutes)

// PROTECTED ROUTES
import protectedRoutes from "./routes/protected.route.js"
app.use("/", protectedRoutes)

// Users Routes
import userRoutes from "./routes/user.routes.js"
app.use("/", userRoutes)

// TASK ROUTES
import taskRoutes from "./routes/task.routes.js";
app.use("/api/tasks", taskRoutes);



mongoose
  .connect(MONGO_URI,)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
