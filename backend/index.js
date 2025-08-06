import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: "https://mytaskapp2025.vercel.app", 
  credentials: true
}));
app.options("*", cors()); 

//test Route
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});
// dummy test route
// app.post("/api/auth/register", (req, res) => {
//   res.status(201).json({ token: "mock-token" });
// });





const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ Created 'uploads/' directory at runtime.");
}




app.use(express.json());
app.use( "/uploads" , express.static("uploads"))

// AUTH ROUTES
import authRoutes from "./routes/auth.routes.js"
app.use('/api/auth',authRoutes)

// PROTECTED ROUTES
import protectedRoutes from "./routes/protected.route.js"
app.use("/api/protected", protectedRoutes)

// Users Routes
import userRoutes from "./routes/user.routes.js"
app.use("/api/users", userRoutes)

// TASK ROUTES
import taskRoutes from "./routes/task.routes.js";
app.use("/api/tasks", taskRoutes);



if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(" Connected to MongoDB");
      app.listen(PORT, "0.0.0.0", () => {
        console.log(` Server running at http://127.0.0.1:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(" MongoDB connection error:", err);
    });
}